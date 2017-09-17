import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: 'backend-data'
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 /*credentials: 'include'*/ } )
      .then( (res) => { return res.text(); })
      .then((data) => {
        this.setState({ backend: data });
      });
  }

  render() {
    return (
      <div className="App">
        <p>
          Talking to the backend yields these categories: <br/>
          {this.state.backend}
        </p>
      </div>
    );
  }
}

export default App;
