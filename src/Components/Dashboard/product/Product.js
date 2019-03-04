import React from "react";
import './product.css';
import {withRouter} from 'react-router-dom';

function Product(props) {
  // console.log(props);
  let { id, name, price, img } = props.item;
  if (img === null) img = 'https://www.freeiconspng.com/uploads/no-image-icon-1.jpg';
  
  return (
    <div className ='Product'>
      <h1>PRODUCT</h1>
      
      <img src={img} alt='product' width='250' height='150'/>
      <div className='product_box'>
        <p className='product_title'>{name}</p>
        <p className='product_price'>{price}</p>
      </div>
      <div className='product_button_box'>
        <button onClick={() => props.deleteProduct(id)}>Delete</button>
        <button onClick={() => props.history.push(`/edit/${props.item.id}`)}>Edit</button>
      </div>
    </div>
  )
}

export default withRouter(Product);