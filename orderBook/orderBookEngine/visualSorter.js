const axios = require('axios').default;
const testBID = async () => {
  const trades = await axios.get(`http://localhost:3004/orderbook?Side=BID&Status=pending&Status=partial&_sort=Price,id&_order=desc`);
  const resBID = trades.data;
  console.log(resBID);
}

const testASK = async () => {
  const trades = await axios.get(`http://localhost:3004/orderbook?Side=ASK&Status=pending&Status=partial&_sort=Price,id&_order=asc`);
  const resASK = trades.data;
  console.log(resASK);
} 

  
testBID()
