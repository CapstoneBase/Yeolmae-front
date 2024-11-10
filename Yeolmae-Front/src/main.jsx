import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as bootstrap from 'bootstrap';
import { Toast } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css';
import store from './redux/modules/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
