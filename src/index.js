import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchBar from './components/searchBar';
import CurencyList from './components/curencies';
import 'bootstrap/dist/css/bootstrap.css';

const API_KEY= 'demo'; // 'PET2PN5LRBYOKHVC';
const URL = 'https://www.alphavantage.co/';
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currencies: [],
        defaultCurrencies: [],
        searchKey: 'prueba'
      };
      this.search(this.state.searchKey)
    }

    componentDidMount() {
        fetch(`${URL}query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=CNY&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            let currency = data['Time Series (Digital Currency Daily)']
            const key = Object.keys(currency)[0];
            const lastPrice = currency[key]
            currency = {...data['Meta Data'], lastPrice }
            this.setState({
                currencies: [...this.state.currencies, currency],
                defaultCurrencies: [...this.state.currencies, currency]
              })
        })
    }

    search(key) {
      this.setState({searchKey: key})
      if (key.searchKey && key.searchKey.length >=3){
        const currencies = this.state.defaultCurrencies.filter(currency=> {
            const currencyName = currency['3. Digital Currency Name'].toLowerCase();
            if (!currencyName) return false;

            return currencyName.includes(key.searchKey);
        })
        this.setState({
            currencies,
          })
      } else {
        this.setState({
            currencies: this.state.defaultCurrencies
          })
      }
    }

    render() {
        if (!this.state.currencies) {
            return (<label>Loading...</label>);
        }
      return (
        <div className="container">
        <div className="row">
            <h1 className="h1">Cryptocurrencies</h1>
        </div>
          <div className="row">
            <div className="col-md-12">
                <SearchBar onBarChange = {searchKey => this.search({searchKey})}/>
                <CurencyList currencies ={this.state.currencies} />
            </div>
          </div>
        </div>
      );
    };
  }

ReactDOM.render(<App />, document.getElementById('root'));

