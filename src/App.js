import React, { Component } from 'react';
import axios from 'axios';
import {Switch, Route, withRouter} from 'react-router-dom';

import Header from './Components/header/Header';
import Dashboard from './Components/dashboard/Dashboard';
import Form from './Components/form/Form';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: [],
      currentProduct: {}
    }

    this.getInventory = this.getInventory.bind(this);
    this.editSelect = this.editSelect.bind(this);
  }
//step 4. You want this method to fire as soon as the user opens your page, so invoke it in the lifecycle method that fires as soon as the component loads.
  componentDidMount() {
    this.getInventory();
  }
  //Step 4. Write a method in App that makes a GET request to the endpoint you just wrote. Once the response comes back from the server, update state with the inventory list you got from the database.
  getInventory(){
    axios.get('/api/products').then(res => this.setState({inventory:res.data}))
  }
  editSelect(product){
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