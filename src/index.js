import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvider } from './DataContext';
import { Provider } from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

      <DataProvider>
      <Provider store={store}>

    <App />
    </Provider>
    
    </DataProvider>

  </React.StrictMode>
);


