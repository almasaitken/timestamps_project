import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MyStopwatch } from './../src/components/screens/home/home.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyStopwatch />
  </React.StrictMode>
);

