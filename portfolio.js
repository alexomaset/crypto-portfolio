const axios = require("axios");
const csv = require("csv-parser");
const fs = require("fs");
const moment = require("moment");

const API_KEY =
  "2280f1ae742c5726d757ed667e9c2a276eaa9c25b2fb7e6ddefd3663e87eef3b";
const CSV_FILE_LOCATION = "./transactions.csv";

// function to get exchange rate
async function getExchangeRate(from, to) {
  const response = await axios.get(
    `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&api_key=${API_KEY}`
  );
  return response.data[to];
}

async function getPortfolioValue(date = null, token = null) {
  let portfolio = {};
  let latestDate = "";

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_LOCATION)
      .pipe(csv())
      .on("data", (data) => {
        const transactionDate = moment
          .unix(data.timestamp)
          .format("YYYY-MM-DD");
        if (!portfolio[data.token]) {
          portfolio[data.token] = 0;
        }

        if (data.transaction_type === "DEPOSIT") {
          portfolio[data.token] += parseFloat(data.amount);
        } else {
          portfolio[data.token] -= parseFloat(data.amount);
        }

        if (!latestDate || moment(transactionDate).isAfter(latestDate)) {
          latestDate = transactionDate;
        }
      })
      .on("end", async () => {
        let results = [];
        for (const t in portfolio) {
          if (!token || t === token) {
            const exchangeRateUSD = await getExchangeRate(t, "USD");
            results.push({
              token: t,
              value: (portfolio[t] * exchangeRateUSD).toFixed(2),
              date: date || latestDate,
            });
          }
        }
        if (date) {
          results = results.filter((r) => r.date === date);
        }
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function displayPortfolioValue(date, token) {
  try {
    const portfolioValue = await getPortfolioValue(date, token);
    console.log(portfolioValue);
  } catch (error) {
    console.error(error);
  }
}

const [, , date, token] = process.argv;
displayPortfolioValue(date, token);
