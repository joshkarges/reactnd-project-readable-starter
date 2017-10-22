import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './css/App.css';
import AllPostsView from './AllPostsView';
import CategoryPostsView from './CategoryPostsView';
import PostDetailsView from './PostDetailsView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={AllPostsView}/>
        <Route exact path="/:category" component={CategoryPostsView}/>
        <Route path="/:category/:post" component={PostDetailsView}/>
      </div>
    );
  }
}

export default App;
