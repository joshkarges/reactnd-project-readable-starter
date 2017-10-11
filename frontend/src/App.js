import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';
import AllPostsView from './AllPostsView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <AllPostsView/>
        )}/>
      </div>
    );
  }
}

export default App;
