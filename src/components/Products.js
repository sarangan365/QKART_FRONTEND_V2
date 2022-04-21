import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css"
import ProductCard from "./ProductCard"


const Products = () => {
    const {enqueueSnackbar} = useSnackbar();
    const [products,setproducts] = useState([]);
    const [loading , setloading] = useState(false);
    const [found,setfound] = useState(false);
    const [debounceTimeout,setdebounceTimeout] = useState(0);
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    try{
      
      let res = await axios.get(`${config.endpoint}/products`)
      .then((response)=>{
        setfound(true);
        setproducts(response.data);
        setloading(false);
      })
      .catch((error)=>{
        enqueueSnackbar(error.response.data.message);
      })
    }
    catch(error)
    {
      enqueueSnackbar(error.message);
    }
  };

  useEffect(()=>{
    setloading(true);
    performAPICall();
  },[])
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  
  const performSearch = async (text) => {
    try{
      setloading(true);
      let res = await axios.get(`${config.endpoint}/products/search?value=${text}`)
      .then((response)=>{
        setproducts(response.data);
        setfound(true);
        setloading(false);
      })
      .catch((error)=>{
        
        setproducts([]);
        //enqueueSnackbar("inside inner catch")
        setloading(false);
        setfound(false)
        //enqueueSnackbar(error.message);
      })
    }
    catch(error)
    {
      enqueueSnackbar("inside outer catch")
      //enqueueSnackbar(error.message);
    }

  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    if( debounceTimeout !== 0)
    {
      clearTimeout(debounceTimeout);
    }
    let timerId = setTimeout(()=>performSearch(event.target.value),1000);
    setdebounceTimeout(timerId);
  };


  return (
    <div>
      <Header hasHiddenAuthButtons>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        
      </Header>
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(event)=>{debounceSearch(event,debounceTimeout)}}
      /> 
<TextField
        className="search-desktop"
        size="small"
        
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(event)=>{debounceSearch(event,debounceTimeout)}}
      /> 
      {/* Search view for mobiles */}
      
      
       <Grid container spacing={2}>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
       <br/>
       <br/>
       {!loading && found &&

       <Grid container spacing={2} columns={{ xs: 4, md: 12 }}>
         {
           products.map((product)=>{
             return (
              <Grid item xs={6} md={3} key={product._id}>
                <ProductCard product={product} />
              </Grid>
             )
           })
         }
          
          
        </Grid>
        }
        {!loading && !found &&
        <Box fullWidth>
        <SentimentDissatisfied/>
        <p> No products found.</p>
        </Box>
        }

        {
          loading && 
          <div>
          <CircularProgress/>Loading Products...
          </div>
        }
      <Footer />
    </div>
  );
};

export default Products;