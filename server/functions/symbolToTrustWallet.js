const { initWasm, } = require("@trustwallet/wallet-core");
const toTrustWallet = async (symbol) => {
    const core = await initWasm();
    const { CoinType } = core;
    if (symbol.toString().toUpperCase() === 'BTC') {
        return CoinType.bitcoin;
    } else if (symbol.toString().toUpperCase() === 'ETH') {
        return CoinType.ethereum;
    } else if (symbol.toString().toUpperCase() === 'BNB') {
        return CoinType.binance;
    } else if (symbol.toString().toUpperCase() === 'LTC') {
        return CoinType.litecoin;
    } else if (symbol.toString().toUpperCase() === 'ADA') {
        return CoinType.cardano;
    } else if (symbol.toString().toUpperCase() === 'APT') {
        return CoinType.aptos;
    } else if (symbol.toString().toUpperCase() === 'DOGE') {
        return CoinType.dogecoin;
    }else if (symbol.toString().toUpperCase() === 'USDT') {
        return CoinType.ethereum;
    }else if (symbol.toString().toUpperCase() === 'BUSD') {
        return CoinType.binance;
    } else {
        return false;
    }
};

module.exports = {
    toTrustWallet
};