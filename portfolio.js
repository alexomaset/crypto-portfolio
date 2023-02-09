const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs");
const moment = require("moment");

const API_KEY =
  "2280f1ae742c5726d757ed667e9c2a276eaa9c25b2fb7e6ddefd3663e87eef3b";
const CSV_FILE_LOCATION = "./transactions.csv";

// function to get exchange rate
async function getExchangeRate(from, to){
    const response = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&api_key=${API_KEY}`
      );
      return response.data[to];
}