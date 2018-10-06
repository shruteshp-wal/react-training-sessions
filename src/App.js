import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoApp from './TodoApp';
import Counter from './Counter';
import axios from 'axios';
import _ from 'lodash';


class UserList extends Component {
  render() {
    return (
      <div>
        {this.props.input.map((user, index) => {
          return (
            <div key={`user_${index}`}>{`Hello! ${user.fn} ${user.ln}`}</div>
          )
        })}
      </div>
    )
  }
}


class App1 extends Component {

  constructor(props) {
    super(props)

    this.addUser = this.addUser.bind(this)

    this.state = {
      users: [
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "`df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
        { fn: "asdf", ln: "df" },
      ]
    }
  }

  componentDidMount() {
    console.log("App Mounted");
  }


  addUser() {
    console.log("Trying to modify input");

    this.setState({
      users: this.state.users.concat([
        { fn: "Mr", ln: "Surprise" }
      ]),
    })
  }

  render() {
    console.log("App Rendered");
    return (
      <React.Fragment>
        <UserList input={this.state.users} />
        <button type="button" onClick={this.addUser}>Add user</button>
      </React.Fragment>
    )
  }
}


class App2 extends Component {
  constructor(props) {
    super(props);

    this.updateInterval = null;

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  componentDidMount() {
    this.updateInterval = setInterval(() => {
      this.props.onInterval()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval)
  }

  handleCheckboxChange(event) {
    this.props.onCheckboxChange(event)

    // TODO: event.stopPropagation()
    // TODO: event.preventDefault()
  }

  render() {
    return (
      <React.Fragment>
        <input type="checkbox" value={this.props.shouldDisplayTime} onChange={this.handleCheckboxChange} />
        {
          this.props.shouldDisplayTime ? (
            <TimeDisplay time={this.props.time} />
          ) : (
              <p>Please check the box to display time</p>
            )
        }
      </React.Fragment>
    );
  }
}

function TimeDisplay(props) {
  return <p>{props.time.toLocaleString()}</p>
}

class App3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchInput: false,
      time: new Date(),
      shouldDisplayTime: true,
    };

    this.showSearch = this.showSearch.bind(this)
    this.hideSearch = this.hideSearch.bind(this)
    this.handleInterval = this.handleInterval.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)

  }

  showSearch() {
    this.setState({
      showSearchInput: true,
    })
  }

  hideSearch() {
    this.setState({
      showSearchInput: false,
    })
  }

  handleInterval() {
    this.setState({
      time: new Date()
    })
  }

  handleCheckboxChange(event) {
    this.setState({
      shouldDisplayTime: event.target.checked
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.showSearchInput ? <Search inputValue={this.state.time.toLocaleString()} onClose={this.hideSearch} /> : <button type="button" onClick={this.showSearch}>Search</button>
        }
        <App2
          shouldDisplayTime={this.state.shouldDisplayTime}
          time={this.state.time}
          onInterval={this.handleInterval}
          onCheckboxChange={this.handleCheckboxChange}
        />
      </React.Fragment>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.inputElement = null;
  }

  componentDidMount() {
    this.inputElement.focus()
  }


  render() {
    return (
      <React.Fragment>
        <input type="text" value={this.props.inputValue} ref={(htmlNode) => {
          this.inputElement = htmlNode;
        }} />
        <button type="button" onClick={this.props.onClose}>close</button>
      </React.Fragment>
    );
  }
}

class App4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      loading: false,
    };

    this.renderCountries = this.renderCountries.bind(this)
  }

  componentDidMount() {
    this.setState({
      loading: true,
    })

    axios({
      method: "GET",
      url: "https://restcountries.eu/rest/v2/all"
    })
    .then((response) => {
      this.setState({
        countries: response.data.map((country) => {
          return country.name
        }),
      })
    })
    .catch((error) => {
      // TODO: Handle errors
    })
    .finally(() => {
      this.setState({
        loading: false,
      })
    })
  }

  renderCountries() {
    return (
      <React.Fragment>
        {
          this.state.countries.map((country, index) => {
            return <div key={`country_${index}`}>{country}</div>
          })
        }
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.loading ? (
            <div>Loading....</div>
          ) : (
            this.renderCountries()
          )
        }
      </React.Fragment>
    );
  }
}

class CountryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      countriesLoaded: false,
      countries: [],
      selectedCountry: '',
      detailsLoading: false,
      details: {
        name: '',
        capital: '',
      }
    };

    this.handleCountrySelectChange = this.handleCountrySelectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "https://restcountries.eu/rest/v2/all"
    })
    .then((response) => {
      this.setState({
        countries: response.data.map((country) => {
          return country.name
        }),
      })
    })
    .catch((error) => {
      // TODO: Handle errors
    })
    .finally(() => {
      this.setState({
        countriesLoaded: true,
      })
    })
  }

  handleCountrySelectChange(event){
    this.setState({
      selectedCountry: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault()

    this.setState({
      detailsLoading: true,
    })

    axios({
      method: "GET",
      url: `https://restcountries.eu/rest/v2/name/${this.state.selectedCountry}?fullText=true`
    })
    .then((response) => {
      let countryData = _.get(response.data, '0');

      if(countryData){
        let { name, capital } = countryData;
        this.setState({
          details: {
            name,
            capital,
          }
        })
      }
    })
    .catch((error) => {
      // TODO: Handle error
    })
    .finally(() => {
      this.setState({
        detailsLoading: false,
      })
    })
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.countriesLoaded ? (
            <React.Fragment>
              <form onSubmit={this.handleSubmit}>
                <select value={this.state.selectedCountry} onChange={this.handleCountrySelectChange}>
                  {
                    this.state.countries.map((country, index) => {
                      return <option key={`countryOption${index}`}>{country}</option>
                    })
                  }
                </select>
                <button type="submit">Get details</button>
              </form>
              {
                this.state.details.name ? (
                  <div>
                    <ul>
                      <li>{`Name: ${this.state.details.name}`}</li>
                      <li>{`Capital: ${this.state.details.capital}`}</li>
                    </ul>
                  </div>
                ) : (
                  <div>Click on submit to fetch details</div>
                )
              }
            </React.Fragment>
          ) : (
            <div>Options are loading. Please hold on</div>
          )
        }
        
      </React.Fragment>
    );
  }
}

export default CountryForm;
