import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Header.css";
import { IconButton } from '@mui/material';
import { cart } from '.';
import { getTotalCartItems } from './Products';
import { useNavigate } from "react-router-dom";

const Header = ({cartItems,forProducts=false}) => {
    const navigate=useNavigate();
    const routeToCart=()=>{
        navigate("/cart");
    }
  return (
   
    <div className="header">
        <div className="header_elements">
            <div className="header_brand">
                <h3>TreeRex Store</h3>
            </div>
            <div className="header_items">
                <p>Products</p>
                {forProducts? <div className="header_addtocart">
                    <IconButton margin={1} onClick={routeToCart}><ShoppingCartIcon/></IconButton>
                    <span className="item-total">{getTotalCartItems(cartItems)}</span>
                </div>:<p>Shopping Cart</p>}
               
            </div>
        </div>
    </div>
  )
}

export default Header