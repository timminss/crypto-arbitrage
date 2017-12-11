const axios = require('axios');

const getPrice = (ticker) => {
    return axios.get(`https://api.bithumb.com/public/recent_transactions/${ticker}`)
        .then((response) => response.data.data)
        .then((trades) => {
            const averageKRW = trades.reduce( ( p, c ) => p + +c.price, 0 ) / trades.length;
            const averageUSD = averageKRW*0.00091;
            return averageUSD;
        });
};

module.exports = {
    getPrice
};