import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import appReducer from './app/app-reducer';
import authReducer from './app/auth-reducer';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
// import * as serviceWorker from './serviceWorker';
// const queryClient = new QueryClient();

// const rootReducer = combineReducers({ auth: authReducer, app: appReducer });

ReactDOM.render(
  <React.StrictMode>
    {/* <QueryClientProvider client={queryClient}> */}
      <Provider store={store}>
        <BrowserRouter basename={'/'}>
          <App />
        </BrowserRouter>
      </Provider>
    {/* </QueryClientProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
