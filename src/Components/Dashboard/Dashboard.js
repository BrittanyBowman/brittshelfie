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
    this.getInventory = this.getInventory.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  componentDidMount() {
    this.getInventory();
  }
  getInventory() {
    axios.get('/api/products')
      .then(res => this.setState({ inventory: res.data }))
  }
  deleteProduct(id) {
    axios
      .delete(`/api/products/${id}`)
      .then(res => this.props.getInventory())
      .catch(err => console.log("deletion error", err));
  }
//add delete and edit functionality
  render() {
    return (
      <div className="Dash" >
        <h1>DASHBOARD</h1>
        {this.state.inventory.map((el) => {
          return <Product key={el.id} item={el} deleteProduct={this.deleteProduct} />
        })}
      </div>
    );
  }
}

export default Dashboard;
