const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/users.js');
const auth = require('./routes/auth.js');
const accounts = require('./routes/accounts');
const crypto = require('./routes/crypto');
const internal = require('./routes/internal');
const orderBook = require("./routes/orderBook");
const test = require('./routes/test.js');
require('dotenv').config();
const { depositesScaner } = require('./functions/depositesScaner.js');

//depositesScaner();

//body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use('/v1/auth', auth )
app.use('/v1/users', userRoutes);
app.use('/v1/accounts', accounts);
app.use('/v1/crypto', crypto);
app.use('/v1/int', internal);
app.use('/v1/orderbook', orderBook);
app.use('/v1/test', test);


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
});



