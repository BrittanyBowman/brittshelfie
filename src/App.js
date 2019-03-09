import React, { Component } from 'react';
import axios from 'axios';
import {Switch, Route, withRouter} from 'react-router-dom';

import Header from './Components/header/Header';
import Dashboard from './Components/dashboard/Dashboard';
import Form from './Components/form/Form';

import './App.css';
// import './Routes.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      currentProduct: {}
    }

    // this.getInventory = this.getInventory.bind(this);
    // this.editSelect = this.editSelect.bind(this);
  }
  componentDidMount() {
    this.getInventory();
  }
  
  getInventory=()=>{
    axios.get('/api/inventory').then(res => this.setState({inventory:res.data}))
  }
  editSelect=(product) =>{
    this.setState({
      currentProduct: product
    })
  }

  render() {
    return(
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/add' component={Form} />
          <Route path='/edit/:id' component={Form} />
        </Switch>
        {/* <Form product={this.state.currentProduct} editSelect={this.editSelect} getInventory={this.getInventory} />
        
        <Dashboard inventory={this.state.inventory} editSelect={this.editSelect} getInventory={this.getInventory} /> */}
      </div>
    );
  }
}

export default withRouter(App);