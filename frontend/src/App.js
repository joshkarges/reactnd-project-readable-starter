import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AllPostsView from './AllPostsView';
import CategoryPostsView from './CategoryPostsView';
import PostDetailsView from './PostDetailsView';
import EditPostView from './EditPostView';
import EditCommentView from './EditCommentView';
import NewPostView from './NewPostView';
import NewCommentView from './NewCommentView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={AllPostsView}/>
          <Route path="/newPost" component={NewPostView}/>
          <Route exact path="/:category" component={CategoryPostsView}/>
          <Route path="/editPost/:post" component={EditPostView}/>
          <Route exact path="/:category/:post" component={PostDetailsView}/>
          <Route path="/:category/:post/newComment" component={NewCommentView}/>
          <Route path="/:category/:post/editComment/:comment" component={EditCommentView}/>
        </Switch>
      </div>
    );
  }
}

export default App;
