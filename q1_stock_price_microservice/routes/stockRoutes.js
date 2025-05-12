const express = require("express");
const router = express.Router();
const { getAverageStockPrice } = require("../controllers/stockController");

router.get("/:ticker", getAverageStockPrice);

module.exports = router;
