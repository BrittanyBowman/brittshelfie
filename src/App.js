import React, { Component } from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import Product from './Components/Product/Product'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dashboard><Product /></Dashboard>
        <Form />
        <Header />
      </div>
    );
  }
}

export default App;
