import React from 'react';

const CurrencyList = (props) => {

  const currencyItems = props.currencies.map((currency, index) => {
    return (
      <div className="card" key={index}>
        <div className= "card-body">
          <h5 className="card-title text-center font-weight-bold"> 
            {currency["3. Digital Currency Name"]}
          </h5>
          <p className="card-text">Volume: {currency.lastPrice['6. market cap (USD)']}</p>
          <p className="card-text">Market: {currency.lastPrice['5. volume']}</p>
        </div>
      </div>
    )
  });

  return (
    <div>
      <br/>
      <h4 className="text-muted text-center">Cryptocurrencies</h4>
        <div className="card-columns">
          {currencyItems}
        </div>
    </div>
  );
};

export default CurrencyList;