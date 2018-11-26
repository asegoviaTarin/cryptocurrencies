'use-strict'

import currenciesData from '../resources/DIGITAL_CURRENCY_DAILY.json'

const API_KEY= 'PET2PN5LRBYOKHVC';
const URL = 'https://www.alphavantage.co/';

function sanitizeData(data) {
  let currency = data['Time Series (Digital Currency Daily)']
  const key = Object.keys(currency)[0];
  const lastPrice = currency[key]
  currency = {...data['Meta Data'], lastPrice }
  return currency;
}

export function getSerie(symbol, market = 'EUR') {
  // MockData
  if (symbol === 'BIT') {
    const data = currenciesData;
    return Promise.resolve(sanitizeData(data));
  }

  return fetch(`${URL}query?function=DIGITAL_CURRENCY_DAILY&symbol=${symbol}&market=${market}&apikey=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    return sanitizeData(data)
  }).catch(e => Promise.reject(e))
}

