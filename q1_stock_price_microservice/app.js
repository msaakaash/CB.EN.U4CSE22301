const express = require("express");
const app = express();
const stockRoutes = require("./routes/stockRoutes");
const correlationRoutes = require("./routes/correlationRoutes");

app.use("/stocks", stockRoutes);
app.use("/stockcorrelation", correlationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
