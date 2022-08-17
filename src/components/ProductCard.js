import React from 'react'
import "./ProductCard.css";
import {Card,CardMedia,CardActions,Button, Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductCard = ({imageURL,price,title,handleAddToCart,cartItems,id,handleAdd,handleReduce}) => {
  const isItemPresent=(id)=>{
    let flag=false;
    let qty=1;
    cartItems.forEach((item)=>{
        if(id === item.id){
            flag=true;
            qty=item.qty;
        }
    });
    return [flag,qty];
}
  return (
    
    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={title}
        height="160"
        image={imageURL}
      />
      
      <CardActions className="cardActions" >
        <p>Rs.{price}</p>
        {!isItemPresent(id)[0]? <Button variant="outlined" onClick={handleAddToCart}>Add To Cart</Button>:
        <Box className="modifyQuantity"><Button size="small" onClick={handleAdd}><AddIcon/></Button>
        <span className="quantity">{isItemPresent(id)[1]}</span>
        <div><Button size="small" onClick={handleReduce}><RemoveIcon/></Button></div>
        </Box>}
        
       
      </CardActions>
    </Card>

    </div>
  )
}

export default ProductCard