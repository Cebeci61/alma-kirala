const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const storeRoutes = require("./routes/store.routes");
const productRoutes = require("./routes/product.routes");
const reservationRoutes = require("./routes/reservation.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const app = express();
const notificationRoutes = require("./routes/notification.routes");
const messageRoutes = require("./routes/message.routes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Alma Kirala backend çalışıyor."
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reservations", reservationRoutes);
app.use(errorHandler);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
module.exports = app;