exports.errorHandler = (err, req, res, next) => {
  console.log("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    message: err.message || "Sunucu hatası"
  });
};