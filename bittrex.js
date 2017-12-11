const axios = require('axios');

const getPrice = (ticker) => {
    return axios.get(`https://bittrex.com/api/v1.1/public/getticker?market=${ticker}`)
        .then((response) => response.data.result.Ask)
        .catch((err) => {
            console.log(`Could not get price for ${ticker}`);
        })
};

module.exports = {
    getPrice
};