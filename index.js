const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./routes/api.routes");
const app = express();

mongoose
  .set("strictQuery", true)
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err.message);
  });
app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
