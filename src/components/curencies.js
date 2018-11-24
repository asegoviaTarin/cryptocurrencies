import React from 'react';

const CurrencyList = (props) => {

  const currencyItems = props.currencies.map((currency) => {
    console.log(currency)
    return (
      <div className="card w-50">
        <div className= "card-body">
          <h5 className="card-title"> 
            {currency["3. Digital Currency Name"]}
          </h5>
          <p class="card-text">Volume:{currency.lastPrice['6. market cap (USD)']}</p>
          <p class="card-text">Market: {currency.lastPrice['5. volume']}</p>
        </div>
      </div>
    )
  });

  return (
    <div>
      <h4>Currencies List</h4>
        {currencyItems}
    </div>
  );
};

export default CurrencyList;