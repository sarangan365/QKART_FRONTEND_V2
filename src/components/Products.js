import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import Footer from "./Footer";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import "./Products.css";

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 *
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

const Products = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  // Set the Products Coming from backend API
  const [productsArray, setProducts] = useState([]);

  const [productsInCart, setProductsInCart] = useState([]);

  // Set the Status to True if API is calling - to show loading circular progress
  const [isProductAPICalling, setAPIStatusForProduct] = useState(true);
  // Same
  const [isCartAPICalling, setAPIStatusForCart] = useState(true);

  // It will store the Value entered by user on Input Search Box
  const [searchValue, setSearchValue] = useState("");

  // While seacrhing the Product, if no product found then isNotFound sets to True
  const [isNotFound, setIsNotFoundStatus] = useState(false);

  // Will set the Timer and Prevents API call till the timer
  const [timerID, setTimer] = useState(null);

  // for search icon on mobile ui
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearchIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopup = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    performAPICall();
    fetchCart(localStorage.getItem("token"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // to display 12 product at initial we need to do this api call

  const performAPICall = async () => {
    try {
      let url = `${config.endpoint}/products`;
      const res = await axios.get(url);
      setProducts(res.data);
      setAPIStatusForProduct(false);
      return res.data;
    } catch (err) {
      if (err.response) {
        console.error(err.response);
      } else {
        console.error(err);
      }
    }
  };

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
  // to
  const performSearch = async (text) => {
    try {
      let url = `${config.endpoint}/products/search?value=${text}`;
      const res = await axios.get(url);
      setProducts(res.data);
      setAPIStatusForProduct(false);
      return res.data;
    } catch (err) {
      if (err.response) {
        // console.log(err.response.status);
        if (err.response.status === 404) {
          setProducts([]);
          setAPIStatusForProduct(false);
          setIsNotFoundStatus(true);
          // console.error(err.response);
        }
      }
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

  // debounce search to
  const debounceSearch = (event, debounceTimeout) => {
    setSearchValue(event.target.value);
    setAPIStatusForProduct(true);
    setIsNotFoundStatus(false);
    if (debounceTimeout) {
      clearInterval(debounceTimeout);
    }
    const debounceID = setTimeout(() => {
      performSearch(event.target.value);
    }, 500);
    setTimer(debounceID);
  };

  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
  const fetchCart = async (token) => {
    if (!token) return;

    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const res = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductsInCart(res.data);
      setAPIStatusForCart(false);
      return res.data;
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  // TODO: CRIO_TASK_MODULE_CART - Return if a product already exists in the cart
  /**
   * Return if a product already is present in the cart
   *
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { String } productId
   *    Id of a product to be checked
   *
   * @returns { Boolean }
   *    Whether a product of given "productId" exists in the "items" array
   *
   */
  const isItemInCart = (items, productId) => {
    if (items.filter((item) => item.productId === productId).length) {
      return true;
    }
    return false;
  };

  /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty,
    options = { preventDuplicate: false }
  ) => {
    if (token) {
      if (options) {
        if (isItemInCart(items, productId)) {
          enqueueSnackbar(
            "Item already in cart. Use the cart sidebar to update quantity or remove item.",
            { variant: "error" }
          );
        } else {
          postCallForCartAPI(token, productId, qty);
        }
      } else {
        postCallForCartAPI(token, productId, qty);
      }
    } else {
      enqueueSnackbar("Please login to add the products in Cart.", {
        variant: "error",
      });
      history.push("/login");
    }
  };

  const postCallForCartAPI = async (token, productId, qty) => {
    try {
      const res = await axios.post(
        `${config.endpoint}/cart`,
        { productId: productId, qty: qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductsInCart(res.data);
    } catch (err) {
      if (err.response) {
        console.error(err.response);
      } else {
        console.error(err);
      }
    }
  };

  const ProductGrid = () => {
    return (
      <>
        <Box className="hero">
          <p className="hero-heading">
            India’s <span className="hero-highlight">FASTEST DELIVERY</span> to
            your door step
          </p>
        </Box>
        {isProductAPICalling ? (
          <Box className="loader" sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <CircularProgress size={38} />
            <p>Loading Products…</p>
          </Box>
        ) : isNotFound ? (
          <Box className="loader">
            <SentimentDissatisfied size={38} />
            <p>No products found</p>
          </Box>
        ) : (
          <Box sx={{ mr: "10px", ml: "10px", mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        {productsArray.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard
              product={product}
              handleAddToCart={() =>
                addToCart(
                  localStorage.getItem("token"),
                  productsInCart,
                  productsArray,
                  product._id,
                  1,
                  true
                )
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
        )}
      </>
    );
  };

  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          fullWidth
          sx={{
            paddingLeft: "10px", // Add left padding
            paddingRight: "10px", // Add right padding
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          value={searchValue}
          onChange={(event) => debounceSearch(event, timerID)}
        />

        {/* Search view for mobiles */}
        {/* <TextField
        className="search-mobile"
        size="small"
        fullWidth 
        sx={{
          paddingLeft: "10px",  // Add left padding
          paddingRight: "10px", // Add right padding
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        value={searchValue}
        onChange={(event) => debounceSearch(event, timerID)}
      /> */}
        <IconButton
        className="search-mobile"
          onClick={handleSearchIconClick}
          sx={{
            color: "primary",
          }}
        >
          <Search color="primary" />
        </IconButton>
        <Popover
          className="search-mobile"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClosePopup}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            sx: {
              width: "90vw",   // Set full-screen width
              paddingLeft: "10px",
              paddingRight: "10px",
            },
          }}
        >
          <Box sx={{ padding: "10px" }}>
            {" "}
            {/* Adding padding around the TextField */}
            <TextField
              size="small"
              fullWidth
              placeholder="Search for items/categories"
              name="search"
              value={searchValue}
              onChange={(event) => debounceSearch(event, timerID)}
            />
          </Box>
        </Popover>
      </Header>
      {localStorage.getItem("username") && localStorage.getItem("token") ? (
        <Grid container>
          <Grid item className="product-grid" sm={12} md={9}>
            <ProductGrid />
          </Grid>
          <Grid item sm={12} md={3} sx={{ backgroundColor: "#E9F5E1" }}>
            {isCartAPICalling ? (
              <Box className="cart empty">
                <CircularProgress size={38} />
                <p>Loading Cart…</p>
              </Box>
            ) : (
              <Cart
                products={productsArray}
                items={productsInCart}
                handleQuantity={addToCart}
              />
            )}
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item className="product-grid">
            <ProductGrid />
          </Grid>
        </Grid>
      )}

      <Footer />
    </div>
  );
};

export default Products;
