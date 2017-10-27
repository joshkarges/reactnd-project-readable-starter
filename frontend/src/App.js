import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AllPostsView from './AllPostsView';
import CategoryPostsView from './CategoryPostsView';
import PostDetailsView from './PostDetailsView';
import EditPostView from './EditPostView';
import NewPostView from './NewPostView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={AllPostsView}/>
          <Route path="/newPost" component={NewPostView}/>
          <Route exact path="/:category" component={CategoryPostsView}/>
          <Route path="/editPost/:post" component={EditPostView}/>
          <Route path="/:category/:post" component={PostDetailsView}/>
        </Switch>
      </div>
    );
  }
}

export default App;
