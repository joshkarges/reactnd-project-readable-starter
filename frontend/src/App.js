import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AllPostsView from './AllPostsView';
import CategoryPostsView from './CategoryPostsView';
import PostDetailsView from './PostDetailsView';
import EditPostView from './EditPostView';
import NewPostView from './NewPostView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={AllPostsView}/>
        <Route exact path="/newPost" component={NewPostView}/>
        <Route exact path="/:category" component={CategoryPostsView}/>
        <Route exact path="/:category/:post" component={PostDetailsView}/>
        <Route path="/:category/:post/edit" component={EditPostView}/>
      </div>
    );
  }
}

export default App;
