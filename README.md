# crypto-portfolio
# Portfolio Value Calculator
This is a Node.js script that calculates the value of a portfolio of cryptocurrencies on a specified date or the latest date if no date is specified. It takes as input a CSV file of transactions and returns the value of the portfolio in USD.

### Requirements
1. Node.js
2. npm or yarn
3. API Key for CryptoCompare API
4. Installation
### To install the dependencies, run:

- Copy code
- npm install
- or

- Copy code
- yarn install
### Configuration
Create a file named .env in the root of the project and set the API key for CryptoCompare API:

- makefile
- Copy code
- API_KEY=<YOUR_API_KEY>
Usage
The script takes two opti onal command-line arguments: date and token.

Given no parameters, return the latest portfolio value per token in USD.
Copy code
node index.js
Given a token, return the latest portfolio value for that token in USD.
css
Copy code
node index.js --token=BTC
Given a date, return the portfolio value per token in USD on that date.
bash
Copy code
node index.js --date=2022-01-01
Given a date and a token, return the portfolio value of that token in USD on that date.
css
Copy code
node index.js --date=2022-01-01 --token=BTC
Input
The script reads the transactions from a CSV file located at ./transactions.csv. The transactions must be in the following format:

sql
Copy code
timestamp,token,transaction_type,amount
1613470400,BTC,DEPOSIT,0.3
1613556800,ETH,DEPOSIT,1
1613643200,BTC,WITHDRAWAL,0.15
where:

timestamp is the Unix timestamp of the transaction in seconds.
token is the symbol of the cryptocurrency.
transaction_type is either DEPOSIT or WITHDRAWAL.
amount is the amount of the transaction.
Output
The script outputs the value of the portfolio in USD in the following format:

css
Copy code
[  {    "token": "BTC",    "value": "3200.00"  },  {    "token": "ETH",    "value": "500.00"  }]
or

json
Copy code
{
  "token": "BTC",
  "value": "1600.00"
}
