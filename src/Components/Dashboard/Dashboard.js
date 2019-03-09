import React, { Component } from "react";
import axios from "axios";
import './Dashboard.css'

import Product from "./product/Product";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: []
    }
  }
  componentDidMount() {
    this.getInventory();
  }
  getInventory=() => {
    axios.get('/api/inventory')
      .then(res => this.setState({ inventory: res.data }))
  }
  deleteProduct=(id) => {
    axios
      .delete(`/api/inventory/${id}`)
      .then(res => this.props.getInventory())
      .catch(err => console.log(err));
  }
//add delete and edit functionality
  render() {
    return (
      <div className="Dash" >
        <h1>DASHBOARD</h1>
        {this.state.inventory.map((el) => {
          
          return <Product key={el.id} item={el} deleteProduct={this.deleteProduct} />
        })}
        {Product}
      </div>
      
    );
    
      }
      
}

export default Dashboard;
