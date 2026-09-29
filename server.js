require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./config/database");
const productRoutes = require("./routes/productRoutes");

const app = express();


// Cho phép Express đọc JSON
app.use(express.json());


// Kết nối MongoDB
connectDB();


// Route kiểm tra server
app.get("/", (req, res) => {
    res.json({
        message: "Product API is running"
    });
});


// Product API
app.use("/api/products", productRoutes);


// Lấy port từ .env
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
    const mongoConnected = mongoose.connection.readyState === 1;

    if (mongoConnected) {
        return res.status(200).json({
            status: "healthy",
            mongodb: "connected"
        });
    }

    return res.status(503).json({
        status: "unhealthy",
        mongodb: "disconnected"
    });
});
// Chạy server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});