import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import appReducer from './redux';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { fetchMe, login, signUp, logout } from './redux/user';

export default createStore(
  appReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware.withExtraArgument({ axios }),
      loggingMiddleware
    )
  )
);

export { fetchMe, login, signUp, logout };
