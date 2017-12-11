const Promise = require('bluebird');

const bithumb = require('./bithumb');
const bittrex = require('./bittrex');
const tickers = require('./tickers');

const run = () => Promise.map(tickers, ticker => {

    return Promise.all([
        bithumb.getPrice(ticker.bithumb),
        bittrex.getPrice(ticker.bittrex)
    ])
    .then(([bithumb, bittrex]) => {
        const percentageGap = ((bithumb - bittrex) / bittrex)*100;
        
        return {
            name: ticker.name,
            bithumb,
            bittrex,
            percentageGap
        };
    });    

})
.then((results) => results.sort((a,b) => b.percentageGap - a.percentageGap))
.then((sortedResults) => {

    const largestSpread = sortedResults.reduce((p,c) => p.percentageGap > c.percentageGap ? p : c);
    const smallestSpread = sortedResults.reduce((p,c) => p.percentageGap < c.percentageGap ? p : c);

    const potentialPercentageGain = Math.round(largestSpread.percentageGap - smallestSpread.percentageGap);
    const date = new Date();

    console.log(`${date} ${potentialPercentageGain}% with ${largestSpread.name} and ${smallestSpread.name}`);

});

run();
setInterval(run, 30 * 1000);