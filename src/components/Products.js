import { TextField, Grid, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { config } from "../App";
import Header from "./Header";
import ProductCard from "./ProductCard";
import { cart } from "./index.js";
import SearchIcon from "@mui/icons-material/Search";
import { useSnackbar } from "notistack";
import { IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


import "./Products.css";
import FilterComponent from "./FilterComponent";
export const getTotalCartItems = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.qty;
  });
  return total;
};
const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtersArray, setFiltersArray] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const[isHidden,setIsHidden]=useState(true)
  const [colorFilter, setColorFilter] = useState({
    isRedChecked: false,
    isBlueChecked: false,
    isGreenChecked: false,
  });
  const [genderFilter, setGenderFilter] = useState({
    isMenChecked: false,
    isWomenChecked: false,
  });
  const [typeFilter, setTypeFilter] = useState({
    isPoloChecked: false,
    isHoodieChecked: false,
    isBasicChecked: false,
  });
  const[priceFilter,setPriceFilter]=useState({
    isPrice1Checked:false,
    isPrice2Checked:false,
    isPrice3Checked:false
})

  const handleAdd = (id) => {
    console.log("Increasing Quantity");
    let maxQuantity = 0;
    products.forEach((product) => {
      if (product.id === id) {
        maxQuantity = product.quantity;
      }
    });
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id && cart[i].qty < maxQuantity) {
        cart[i].qty += 1;
        break;
      } else if (cart[i].qty === maxQuantity) {
        enqueueSnackbar(
          "Cannot add more items. Maximum quantity reached for this item",
          { variant: "info" }
        );
        return;
      }
    }

    console.log("Increased Cart Quantity", cart);
    console.log("Now setting cartItems");
    setCartItems([...cart]);
  };
  const handleReduce = (id) => {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].qty -= 1;
        if (cart[i].qty == 0) {
          cart.splice(i, 1);
        }
        break;
      }
    }
    setCartItems([...cart]);
  };

  const handleAddToCart = (id) => {
    let flag = false;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        cart[i].qty += 1;
        flag = true;
        break;
      }
    }
    if (!flag)
    products.forEach((product)=>{
        if(product.id === id)
            cart.push({ id: id, qty: 1,imageURL:product.imageURL,price:product.price,name:product.name });
    }) 
    
    setCartItems([...cart]);
  };

  const handleOnChange = (e) => {
    console.log(e);
    if (e.target.name.includes("color")) {
      const [key, value] = [e.target.id, e.target.checked];
      setColorFilter({ ...colorFilter, [key]: value });
    }
    if (e.target.name.includes("gender")) {
      const [key, value] = [e.target.id, e.target.checked];
      setGenderFilter({ ...genderFilter, [key]: value });
    }
    if(e.target.name.includes("type")){
      const [key, value] = [e.target.id, e.target.checked];
      setTypeFilter({ ...typeFilter, [key]: value });
        
    }
    let priceFilterDummy={};
    if(e.target.name.includes('price')){
        const [key, value] = [e.target.id, e.target.checked];
        console.log("Setting Price Filter l1")
        setPriceFilter({...priceFilter,[key]:value}) 
    }
    let searchArray = [];
    if(!e.target.name.includes('price')){
    if (e.target.checked === true) {
      searchArray = [...filtersArray, e.target.title];
      //console.log(searchArray);
    } else if (!e.target.checked) {
      let indx = filtersArray.indexOf(e.target.title);

      searchArray = [
        ...filtersArray.slice(0, indx),
        ...filtersArray.slice(indx + 1),
      ];
    }
    console.log("This is the search Array", searchArray);
    console.log("Setting Filters Array Now");
    setFiltersArray(searchArray);
    console.log("Real Array", filtersArray);
    console.log("Now going for a beautiful search");
    searchProducts(searchText, searchArray);
}
  };

  const handleInput = (e) => {
    setSearchText(e.target.value);
    searchProducts(e.target.value, filtersArray);
  };
  const filterProductsByPrice=(priceFilter)=>{
    let arr=[];
    let filterByPriceArr1=[];
    let filterByPriceArr2=[];
    let filterByPriceArr3=[];
    console.log(priceFilter)
    if(priceFilter.isPrice1Checked){
        
        filterByPriceArr1=products.filter(product=>product.price>=0 && product.price<=250)
                       
    }
    if(priceFilter.isPrice2Checked){
        if(arr.length === 0){
            arr=[...products];
        }
        
        filterByPriceArr2=products.filter((product)=>{
            return(
                product.price>=251 && product.price<=450
            )
        })

    }
    if(priceFilter.isPrice3Checked){
        if(arr.length === 0){
            arr=[...products];
        }
        filterByPriceArr3=products.filter((product)=>{
            return(
                product.price>=450
            )
        })
    }
    arr=[...filterByPriceArr1,...filterByPriceArr2,...filterByPriceArr3]
    console.log(arr);
    arr.length>0?setFilteredProducts(arr):setFilteredProducts(products);
  }
  const searchProducts = (text = "", searchArray = []) => {
    console.log("Filter Array from", filtersArray);

    let arr = products.filter((product) => {
      return (
        text.includes(product.name) ||
        text.includes(product.color) ||
        text.includes(product.type) || searchArray.includes(product.color) || searchArray.includes(product.type)
        ||searchArray.includes(product.gender)
      );
    });


    console.log(arr)
    setFilteredProducts(arr);
    console.log(text.length, " ", searchArray.length);
    if (text.length === 0 && searchArray.length === 0)
      setFilteredProducts(products);
  };
  const fetchProducts = async () => {
    const url = config.endpoint;
    try {
      const res = await axios.get(url);
      console.log(res.data);
      setProducts(res.data);
      setFilteredProducts(res.data);
      enqueueSnackbar("Page Loaded Successfully", { variant: "success" });
    } catch (e) {
      if (e.response && e.response.status < 500) {
        enqueueSnackbar(e.response.message, { variant: "error" });
      } else
        enqueueSnackbar("Server Error. We are working on it.", {
          variant: "error",
        });
      console.log(e.response);
    }
  };
  const handleMobileFilter=()=>{
    console.log("button clicked");
    if(isHidden === true){
        setIsHidden(false);
    }
    if(isHidden === false){
        setIsHidden(true);
    }
    

  }
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(()=>{
    filterProductsByPrice(priceFilter)
  },[priceFilter])
  return (
    <div>
      <Header cartItems={cartItems} forProducts={true} />
      <Box className="search-bar">
        <TextField
          className="search"
          id="standard-search"
          type="search"
          variant="standard"
          placeholder="Search for Items/categories"
          value={searchText}
          onChange={handleInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
       {<IconButton className="filter-mobile" onClick={handleMobileFilter}><FilterAltIcon /></IconButton>}
      </Box>
      <Grid container spacing={2}>
        {console.log("rendering Filters",isHidden)}
        {<Grid item className={isHidden?"filters":""} xs={12} md={3}>
            <FilterComponent colorFilter={colorFilter} priceFilter={priceFilter} genderFilter={genderFilter}
            typeFilter={typeFilter} handleOnChange={handleOnChange}/>
        </Grid>
        }
        <Grid item md={9}>
          <Grid container>
            {filteredProducts.map((product) => {
              return (
                <Grid
                  item
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={3}
                  paddingX={1}
                  marginY={1}
                >
                  <ProductCard
                    imageURL={product.imageURL}
                    price={product.price}
                    title={product.title}
                    handleAddToCart={() => handleAddToCart(product.id)}
                    handleAdd={() => handleAdd(product.id)}
                    handleReduce={() => handleReduce(product.id)}
                    cartItems={cartItems}
                    id={product.id}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;

// {products.map((product)=>{
//     return(
//         <Grid item key={product.id} xs={12} md={3}>
//             <div className="product">
//                 <div className='image-container'>
//                     <img src={product.imageURL} alt={product.name}/>
//                 </div>
//                 <div className="card-body">
//                     <p>{product.price}</p>
//                     <p>Button</p>
//                 </div>
//             </div>
//         </Grid>

//     )})}
