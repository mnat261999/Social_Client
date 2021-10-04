import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import DataProvider from './redux/store'
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App/>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

