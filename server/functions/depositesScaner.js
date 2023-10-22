const { default: axios } = require("axios");
const db = require("../dbConfig.js");
const util = require('util');
const { initWasm ,TW ,KeyStore } = require("@trustwallet/wallet-core");
const { toTrustWallet } = require("../functions/symbolToTrustWallet.js");
const query = util.promisify(db.query).bind(db);

const api_key = process.env.BLOCKCHAIR_KEY;
//sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// query all data from deposites database
const dbDeposits = async () => {
    let q = `SELECT * FROM deposites`;
    const dbTrasction = await query(q);
    return dbTrasction;
};


// creates all address from all memonics on the memonics table
const allAddresses = async function(req, res) {
    const chains = ['BNB', 'BTC', 'LTC', 'ETH'];
    const q = `SELECT * FROM nemonics`;
    
    //initial core wallet
    const core = await initWasm();
    const { HDWallet } = core;
    
    const results = await query(q);
    
    let addresses = [];
  
    for (const row of results) {
      const promises = chains.map(async (ch) => {
        const trustwallet = await toTrustWallet(ch);
        if (trustwallet) {
          const wallet = HDWallet.createWithMnemonic(row.Memonic, "");
          const add = wallet.getAddressForCoin(trustwallet);
          return { address: add, ClientId: row.Client_ID};
        }
      });
      const result = await Promise.all(promises);
      addresses.push(result);
    }
    return addresses;
}
  
const fetchDataAddress = async () => { 
  const address = await allAddresses();
  const allData = [];
  for (let add of address[0]) {
    if (add.address.startsWith('bnb')) {
      // let results = await axios.get('https://dex.binance.org/api/v1/transactions', { params: { address: add } });
      // results = results.data;
      // allData.bnb = results;
      // allData.bnb = add
    } 
    else if (add.address.startsWith('bc1')) {
      let results = await axios.get(`https://api.blockchair.com/bitcoin/dashboards/address/${add.address}?transaction_details=true&omni=true`, { params:{key: api_key} });
      results = { BTC: results.data };
      allData.push(results);
    } else if (add.address.startsWith('ltc')) {
      let results = await axios.get(`https://api.blockchair.com/litecoin/dashboards/address/${add.address}?transaction_details=true&omni=true`, { params:{key: api_key} });
      results = { LTC: results.data };
      allData.push(results);
    }
      else if (add.address.startsWith('0x')) {
        let results = await axios.get(`https://api.blockchair.com/ethereum/erc-20/0xdac17f958d2ee523a2206206994597c13d831ec7/dashboards/address/0xe8334f56c3906b48c9a2e04eb87e4500acd7a36b`, { params:{key: api_key} });
        results = { USDT : results.data };
        allData.push(results);
      }
  };
  return allData;
};
// cleanning the requrues from an api to format - address: transaction
const anylizingData = async () => {
  const allData = await fetchDataAddress();
  const data = await allData;
  let newCleanData = [];
  try {
    for (let coin of data) {
      let objValue = Object.values(Object.values(coin)[0].data)[0].transactions;
      let objKey = Object.keys(coin)[0];
      let newObj = { [objKey] : objValue };
      newCleanData.push(newObj);
    }
    return newCleanData;
  } catch (error) {
      console.log(error);
};
}

const scanAndUpdate = async () => {
  const address = await allAddresses();
  const apiResults = await anylizingData();
  const dbResults = await dbDeposits();
  for (let coin of apiResults) {
    if (Object.keys(coin)[0] === "BTC" && Object.values(coin)[0].length  > 0) {
      console.log("btc");
    } else if (Object.keys(coin)[0] === "LTC" && Object.values(coin)[0].length > 0) {
      console.log("ltc");
    } else if (Object.keys(coin)[0] === "USDT" && Object.values(coin)[0].length > 0) {
      // from array that return from api
      const results = await Object.values(coin)[0].reduce(async (acc, cur) => {
        // checks if we already have trasaction on the data base updated
        let index = dbResults.findIndex((el) => { cur.transaction_hash.toString() === el.TxId.toString() });
        let checker = dbResults.includes(cur.transaction_hash);
        console.log(checker)
        // checks if our address is the recipient
        let recipient = address[0].findIndex((el) => el.address === "0x5bF8bb9dc8330E1A87BbaafFfB8DafF115D648EC");

        if (index === -1 && recipient !== -1) {
          // extract an client id to update database
          let clientId = address[0][recipient].ClientId;
          try {
            let q = `INSERT INTO deposites (Client_id, Currency, Amount, Status, TxId, timestamp) VALUES ('${clientId}','${cur.token_symbol}','${cur.value_approximate}', 'completed','${cur.transaction_hash}',now())`;
            return await query(q);
          } catch (error) {
            return error;
          }
        } 
      });
      return results? results: null;
    }
  }
}

const depositesScaner =  () => {
    try {
      setInterval( async () => {
        scanAndUpdate();
        }, 10000);
    } catch (error) {
        console.log(error);
      };
};

module.exports = {
  depositesScaner
};