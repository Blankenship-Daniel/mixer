import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './store';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
