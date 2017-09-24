import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import CategoriesView from './CategoriesView';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   backend: 'backend-data'
    // }
  }

  // componentDidMount() {
  //   const url = `${process.env.REACT_APP_BACKEND}/categories`;
  //   console.log('fetching from url', url);
  //   fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
  //                /*credentials: 'include'*/ } )
  //     .then( (res) => { return res.text(); })
  //     .then((data) => {
  //       this.setState({ backend: data });
  //     });
  // }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={() => (
          <CategoriesView/>
        )}/>
      </div>
    );
  }
}

export default App;
