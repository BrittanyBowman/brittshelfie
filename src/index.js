// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';


// ReactDOM.render(
// <App />, document.getElementById('root'));

// serviceWorker.unregister();


import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <App />
  </ Router>, document.getElementById('root'));

serviceWorker.unregister();