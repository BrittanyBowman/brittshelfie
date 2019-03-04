import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';

import "./Form.css";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      img: "",
      edit: false
    };
  }
componentDidMount() {
  let {id} = this.props.match.params;
  if (id) {
    axios.get(`api/products/${id}`)
      .then(res => {
        this.setState({...res.data, edit:true})
      })
  }
}
  //setting up image input
  imageInput(url) {
    this.setState({ img: url });
  }
  //Setting the new product selection on state
  componentDidUpdate(oldProps) {
    if( this.props.match.path !== oldProps.match.path) {
      this.setState({
        name: '',
        price: 0,
        img: ''
      })
    }
  }
  //item name input function, allows names up to 25 characters on the form
  inputName(text) {
    if (text.length <= 25) {
      this.setState({ name: text });
    }
  }
  // handles editing/updating of product information in form input (on product?)
  handleEdit() {
    let { id, name, price, img } = this.state;
    if (name) {
      let product = {
        name,
        price: this.numberSubmit(price),
        img
      };
      axios.put(`/api/products/${id}`, product)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => console.log('update error', err))
  } else {
    console.log('Error! Missing name!');
  }
}
  //send new product function
  handleSubmit() {
    let { name, price, img } = this.state;
    if (name) {
      let product = {
        name,
        price: this.numberSubmit(price),
        img
      };
      axios
        .post('/api/products', product)
        .then(res => {
          this.props.history.push('/');
        })
        .catch(err => console.log('create error', err))
    } else {
      console.log("failure, retry");
    }
  }
  //button function clears the forms on 'cancel' - once I changed this to the step 3 routing I did not understand it. match.params.id? I get the props.history.push. Also, it messed up my URL form. 
  clearInputs() {
    if (this.props.match.params.id) {
      this.props.history.push('/');
    } else {
      this.setState({
        name: '',
        price: 0,
        img: '',
        edit: false
      })
    }
  }

  //Lots of crazy math and logic crap to make the $dollar work in this input form (found with source) DOES NOT WORK.

  inputNum(val) {
    this.setState({ price: val });
  }

  //rounding numbers and $dollars
  numberSubmit(num) {
    num ? (num = Number(num)) : (num = 0);
    return Math.round(num * 100);
  }

  render() {
    return (
      <div className="Form">
        <h1>
          <center>FORM</center>
        </h1>
        {this.state.img ? (
          <div
            className="form_img_preview"
            style={{ backgroundImage: `url('${this.state.img}')` }}
          />
        ) : (
          <div
            className="form_img_preview"
            style={{
              backgroundImage: `url('https://www.freeiconspng.com/uploads/no-image-icon-1.jpg')`
            }}
          />
        )}
        <form>
          <h4>URL</h4>
          <input
            type="text"
            value={this.state.img}
            onChange={e => this.imageInput(e.target.value)}
          />
          <h4>PRODUCT NAME</h4>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.inputName(e.target.value)}
          />
          <h4>PRICE</h4>
          <input
            type="text"
            // pattern="[0-9]*"
            value={this.state.price}
            onChange={e => this.inputNum(e.target.value)}
          />
          <div className="form_button_box">
            <button onClick={() => this.clearInputs()}>Cancel</button>
            {this.state.edit
             ? <button onClick={() => this.handleEdit()}>Save Changes</button>
             : <button onClick={() => this.handleSubmit()}>
                Add to Inventory
              </button>
            }
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Form);
