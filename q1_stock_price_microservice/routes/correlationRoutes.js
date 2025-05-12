const express = require("express");
const router = express.Router();
const { getStockCorrelation } = require("../controllers/correlationController");

router.get("/", getStockCorrelation);

module.exports = router;
