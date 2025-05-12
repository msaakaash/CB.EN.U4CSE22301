const stockService = require("../services/stockService");

exports.getAverageStockPrice = async (req, res) => {
  const { ticker } = req.params;
  const minutes = parseInt(req.query.minutes);

  if (!ticker || isNaN(minutes)) return res.status(400).send({ error: "Invalid parameters" });

  const data = await stockService.fetchAverageStockPrice(ticker, minutes);
  res.json(data);
};
