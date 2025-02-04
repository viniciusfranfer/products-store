const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/db.js');
const productRoutes = require('./routes/product.route.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();
app.use(express.json()); //allows us to parse json data

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT} `);
})

