import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { cart } from ".";
import Header from "./Header";
import "./Cart.css";
import { Stack } from "@mui/system";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems([...cart]);
  }, []);
  const getOrderTotal=(items)=>{
    let totalCost=0;
    items.forEach((item)=>{
        totalCost+=item.qty * item.price;
    })
    return totalCost;
  }
  return (
    <div>
      <Header />
        <Box className="containerBox">
        <h3>Shopping Cart</h3>
          {cartItems.length > 0
            ? cartItems.map((item) => (
                <Box className="cart_items" key={item.id}>
                  <Box className="image-container" margin={1} padding={1}>
                    <img src={item.imageURL} />
                  </Box>
                  <Box margin={1} padding={1}>
                    <p>{item.name}</p>
                    <p>Rs.{item.price}</p>
                  </Box>
                  <Box margin={1} padding={1}>
                    <p>Qty:{item.qty}</p>
                  </Box>
                </Box>
                
              ))
            : <Box className="noItems">
                <p>No items found in your cart</p>
                </Box>}
            {cartItems.length>0?
            <Stack direction="row" className="orderContainer" spacing={3}>
                <h5>Order Total</h5>
                <p className="total">Rs.{getOrderTotal(cartItems)}</p>
            </Stack>:null
        }
        </Box>
    </div>
  );
};

export default Cart;
