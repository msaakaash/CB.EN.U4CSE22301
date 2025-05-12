const axios = require("axios");
const cache = require("../cache/priceCache");

const BASE_URL = "http://20.244.56.144/evaluation-service/stocks";

exports.fetchAverageStockPrice = async (ticker, minutes) => {
  let prices = cache.getPrices(ticker, minutes);
  if (!prices) {
    const url = `${BASE_URL}/${ticker}?minutes=${minutes}`;
    const response = await axios.get(url);
    prices = response.data;
    cache.setPrices(ticker, prices);
  }

  const avg = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

  return {
    averageStockPrice: parseFloat(avg.toFixed(6)),
    priceHistory: prices,
  };
};
