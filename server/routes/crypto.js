//imports
const btcLib = require('bitcoinjs-lib');
const { BIP32Factory } = require('bip32');
const ecc = require('tiny-secp256k1');
const bip39 = require('bip39');
const express = require('express');
const router = express.Router();
const db = require("../dbConfig.js");
const { authenticateToken } = require('../functions/auth');
const { initWasm ,TW ,KeyStore} = require("@trustwallet/wallet-core");
const base64 = require('base-64');
const { toTrustWallet } = require("../functions/symbolToTrustWallet");
//END of imports
const bip32 = BIP32Factory(ecc);
const mnemonic = process.env.MEMONIC;

const seed = bip39.mnemonicToSeedSync(mnemonic);
const node = bip32.fromSeed(seed);
const privetKey = node.toWIF();
const pubKey = node.neutered().toBase58();

//get address for deposite BTC segwite
router.get('/getBTCaddress', authenticateToken, (req, res) => {
    const { indexID } = req.user;
    console.log(indexID); 
    const path = `m/84'/0'/0'/0/${indexID}`;
    const child = node.derivePath(path);
    const { address } = btcLib.payments.p2wpkh({ pubkey: child.publicKey });
    return res.status(200).json({address});
});

//get address for evrey chain
router.get('/getAddress', authenticateToken, async(req, res) => {
    const { id } = req.user;
    const { currency, network } = req.query;
    //initial core wallet
    const core = await initWasm();
    const { HDWallet } = core;
    //waiting for define trust wallet currency 
    const trustwallet = await toTrustWallet(currency);
    //if usdt or busd we define native chain address
    const chain = currency === "USDT" && network === "ETH" ? "ETH" : currency === "BUSD" && network === "BNB" ? "BNB" : currency;
    if (trustwallet) {
    db.query(`SELECT * FROM nemonics WHERE Client_ID = '${id}'`, (error, results, field) => {
        if (error) return res.status(200).json("error");

        if (results.length > 0) {
            const wallet = HDWallet.createWithMnemonic(results[0].Memonic , "")
            const address = wallet.getAddressForCoin(trustwallet);
            return res.status(200).json({ address });
            
        } else {
            let wallet = HDWallet.create(128, "");
            const encodeWallet = wallet.mnemonic();
            db.query(`INSERT INTO nemonics (Client_ID, Currency, Memonic) VALUES ('${id}','${chain.toUpperCase()}','${encodeWallet}')`,
                (error, results, field) => {
                    if (error) return res.status(200).json("error");
                    if (results) {
                        return res.status(200).json({ address: wallet.getAddressForCoin(trustwallet)});
                    }
                });
            }
    });
    } else {
        return res.status(400).json("chain not exist");
    }
});


module.exports = router;