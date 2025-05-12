const cache = {};

exports.getPrices = (ticker, minutes) => {
  const record = cache[ticker];
  if (!record) return null;
  const now = new Date().getTime();
  if (now - record.timestamp > minutes * 60 * 1000) {
    delete cache[ticker];
    return null;
  }
  return record.data;
};

exports.setPrices = (ticker, data) => {
  cache[ticker] = {
    data,
    timestamp: new Date().getTime(),
  };
};
