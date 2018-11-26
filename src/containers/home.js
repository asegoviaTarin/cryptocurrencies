import React from 'react';
import SearchBar from '../components/searchBar';
import CurencyList from '../components/curencies';
import { getSerie } from '../services/api-alphavantage'
import 'bootstrap/dist/css/bootstrap.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      defaultCurrencies: [],
      searchKey: ''
    };
    this.search(this.state.searchKey)
  }

  componentDidMount() {
    const promises = [];
    // promises.push(getSerie('BIT'));
    // promises.push(getSerie('BIT'));
    // promises.push(getSerie('BIT'));
    // promises.push(getSerie('BIT'));
    // promises.push(getSerie('BIT'));
    // promises.push(getSerie('BIT'));
    promises.push(getSerie('BTC'));
    promises.push(getSerie('ETH')); //ETH
    promises.push(getSerie('XRP')); //XRP

    Promise.all(promises)
    .then(serie => {
      this.setState({
        currencies: this.state.currencies.concat(serie),
        defaultCurrencies: this.state.currencies.concat(serie),
      })
    });
  }

  search(key) {
    this.setState({searchKey: key})
    const searchCharTrigger = 3;
    if (key.searchKey && key.searchKey.length >= searchCharTrigger) {
      const currencies = this.state.defaultCurrencies.filter(currency => {
        const currencyName = currency['3. Digital Currency Name'].toLowerCase();
        if (!currencyName) return false;

        return currencyName.includes(key.searchKey);
      });

      this.setState({
        currencies,
      });

    } else {
      this.setState({
        currencies: this.state.defaultCurrencies
      });
    }
  }

  render() {
    if (!this.state.currencies) {
      return (<label>Loading...</label>);
    }
    return (
      <div className="container">
      <div>
        <SearchBar onBarChange = { searchKey => this.search({ searchKey })}/>
      </div>
        <div className="container bg-light">
          <CurencyList currencies ={ this.state.currencies } />
        </div>
      </div>
    );
  };
}

export default App;
