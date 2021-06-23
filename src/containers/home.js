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

    promises.push(getSerie('BTC'));
    promises.push(getSerie('ETH'));
    promises.push(getSerie('XRP'));

    Promise.all(promises)
    .then(serie => {
      this.setState({
        currencies: this.state.currencies.concat(serie),
        defaultCurrencies: this.state.currencies.concat(serie),
      })
    })
    .catch(e => {
      this.setState({error : e})
    });
  }

  search(key) {
    this.setState({searchKey: key})
    const searchCharTrigger = 3;
    const value = key.searchKey && key.searchKey.toLowerCase();
    if (value && value.length >= searchCharTrigger) {
      const currencies = this.state.defaultCurrencies.filter(currency => {
        const currencyName = currency['3. Digital Currency Name'].toLowerCase();
        if (!currencyName) return false;
        return currencyName.includes(value);
      });

      this.setState({
        currencies,
      });

    } else {
      console.log(this.state.defaultCurrencies)
      this.setState({
        currencies: this.state.defaultCurrencies
      });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger" role="alert">
          Something was wrong, check API response...
        </div>
      );
    }
    if (!this.state.currencies) {
      return(
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      );
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
