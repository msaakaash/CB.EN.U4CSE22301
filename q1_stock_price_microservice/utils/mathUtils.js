exports.calculatePearsonCorrelation = (x, y) => {
  const n = x.length;
  if (n === 0 || y.length !== n) return 0;

  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  let num = 0, denomX = 0, denomY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denomX += dx ** 2;
    denomY += dy ** 2;
  }

  return num / Math.sqrt(denomX * denomY);
};
