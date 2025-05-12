const correlationService = require("../services/correlationService");

exports.getStockCorrelation = async (req, res) => {
  const { minutes, ticker } = req.query;
  const tickers = Array.isArray(ticker) ? ticker : [ticker];

  if (tickers.length !== 2 || isNaN(parseInt(minutes))) {
    return res.status(400).json({ error: "Provide exactly two tickers and valid minutes" });
  }

  const result = await correlationService.calculateCorrelation(tickers, parseInt(minutes));
  res.json(result);
};
