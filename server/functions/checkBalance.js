const db = require("../dbConfig.js");
function checkBalance(req, res, next) {
    const { id } = req.user;
    const { sellCoin, amount, sellAmount } = req.body;
    const amountToFloat = parseFloat(amount) || parseFloat(sellAmount);
    if(amountToFloat < 0) return res.status(200).json("Amount can't be 0 or less");
    let q = `select available('${id}', '${sellCoin.toLocaleUpperCase()}') as avl`;
    db.query(q, function (error, results, fields) {
        if (error) return res.status(400).json('bad request');
        const balance = parseFloat(results[0].avl);
        if (amountToFloat > balance) {
            return res.status(200).json("Sufficient Funds");
        } else {
            next();
        }
        return;
    });
}

module.exports = {
    checkBalance: checkBalance
};