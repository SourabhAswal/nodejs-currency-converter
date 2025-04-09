const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { result: null, error: null });
});

app.post("/convert", async (req, res) => {
  const { amount, from, to } = req.body;

  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${from}/${to}/${amount}`
    );

    const result = response.data;
    if (result.result === "success") {
      res.render("index", {
        result: `${amount} ${from} = ${result.conversion_result} ${to}`,
        error: null,
      });
    } else {
      res.render("index", { result: null, error: "Conversion failed." });
    }
  } catch (err) {
    res.render("index", { result: null, error: "API Error or invalid currency." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

