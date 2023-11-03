const axios = require('axios').default;

async function axiosGet(url, body = {}, headers) {
    const request = await axios.get(url, body, headers);
    return request;
}

module.exports = {axiosGet}