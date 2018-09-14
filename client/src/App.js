import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Alert from './components/Alert';
import NavBar from './components/NavBar';
import SignForm from './components/SignForm';
import Jokes from './components/Jokes';

const URL = 'http://localhost:3300/api';
const colors = [ 
  'primary', 'secondary', 'success', 'danger', 
  'warning', 'info', 'light', 'dark' 
];

class App extends Component {
  state = {
    isLoggedIn: false
  };

  signUp = (creds) => {
    axios.post(`${URL}/register`, creds)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        this.setState({ isLoggedIn: true });
      })
      .catch(err => console.error(err));
  };

  signIn = (creds) => {
    axios.post(`${URL}/login`, creds)
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        this.setState({ isLoggedIn: true });
      })
      .catch(err => console.error(err));
  };

  signOut = () => {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false });
  };

  getToken = () => {
    return localStorage.getItem('token');
  };

  getJokes = () => {
    return axios.get(`${URL}/jokes`, {
      headers: { 
        Authorization: this.getToken() 
      } 
    });
  };

  nAlerts = (n) => {
    let arr = new Array(n).fill(0);
    return (
      <div>
        {arr.map((n, ind) => {
          return (
            <Alert 
              key={ind} 
              color={colors[Math.floor(Math.random() * 8)]} 
            />
          );
        })}
      </div>
    );
  };

  render() {
    const token = this.getToken();
    return (
      <div className="App">
        <NavBar signOut={this.signOut} />

        <Route 
          exact
          path="/"
          render={() => {
            return (
              !token ? (
                <div>
                  {this.nAlerts(15)}
                </div>
              ) : <Redirect to="/jokes" />
            );
          }}
        />

        <Route 
          exact 
          path="/signup" 
          render={() => {
            return !token ? <SignForm signFunc={this.signUp} btnText="Sign up" /> 
              : <Redirect to="/jokes" />;
          }}
        />

        <Route 
          exact 
          path="/signin" 
          render={() => {
            return !token ? <SignForm signFunc={this.signIn} btnText="Sign in" />
              : <Redirect to="/jokes" />;
          }}
        />

        <Route 
          exact
          path="/jokes"
          render={() => {
            return (
              <div>
                {token ? <Jokes getJokes={this.getJokes} /> : <Redirect to="/" />}
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default App;
