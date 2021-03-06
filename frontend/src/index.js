import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
import './css/App.css';
import './css/posts.css';
import './css/comments.css';
import './css/categories.css';
import './css/input.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

console.log(store.getState());

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
