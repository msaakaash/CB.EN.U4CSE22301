const stockService = require("./stockService");
const { calculatePearsonCorrelation } = require("../utils/mathUtils");

exports.calculateCorrelation = async (tickers, minutes) => {
  const [ticker1, ticker2] = tickers;

  const stock1 = await stockService.fetchAverageStockPrice(ticker1, minutes);
  const stock2 = await stockService.fetchAverageStockPrice(ticker2, minutes);

  const aligned = alignDataByTimestamp(stock1.priceHistory, stock2.priceHistory);

  const x = aligned.map(d => d.x);
  const y = aligned.map(d => d.y);
  const correlation = calculatePearsonCorrelation(x, y);

  return {
    correlation: parseFloat(correlation.toFixed(4)),
    stocks: {
      [ticker1]: {
        averagePrice: stock1.averageStockPrice,
        priceHistory: stock1.priceHistory,
      },
      [ticker2]: {
        averagePrice: stock2.averageStockPrice,
        priceHistory: stock2.priceHistory,
      }
    }
  };
};

function alignDataByTimestamp(prices1, prices2) {
  const map2 = new Map(prices2.map(p => [p.lastUpdatedAt, p.price]));
  return prices1
    .filter(p => map2.has(p.lastUpdatedAt))
    .map(p => ({ x: p.price, y: map2.get(p.lastUpdatedAt) }));
}
