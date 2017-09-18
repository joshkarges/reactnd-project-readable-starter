import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // composeEnhancers(
  //   applyMiddleware(logger)
  // )
);

console.log(store.getState());

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
