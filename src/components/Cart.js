import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router-dom";
import "./Cart.css";

const Item = ({
  img,
  name,
  cost,
  qty,
  productId,
  items,
  products,
  handleQuantity,
  isReadOnly,
}) => {
  return (
    <Box className="item">
      <Box className="image-container">
        <img
          // Add product image
          src={img}
          // Add product name as alt eext
          alt={name}
          width="100%"
          height="100%"
        />
      </Box>
      <Box className="item-content">
        <div>{name}</div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ minWidth: "7rem" }}
        >
          {isReadOnly ? (
            <p>Qty : {qty}</p>
          ) : (
            <ItemQuantity
              // Add required props by checking implementation
              value={qty}
              handleAdd={() =>
                handleQuantity(
                  localStorage.getItem("token"),
                  items,
                  products,
                  productId,
                  qty + 1,
                  false
                )
              }
              handleDelete={() =>
                handleQuantity(
                  localStorage.getItem("token"),
                  items,
                  products,
                  productId,
                  qty - 1,
                  false
                )
              }
            />
          )}

          <Box padding="0.5rem" fontWeight="700">
            ${cost}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 *
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

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

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 *
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  let cartItem = [];
  cartData.forEach((productInCart) => {
    let filteredArray = productsData.filter(
      (product) => product._id === productInCart.productId
    );
    cartItem.push({ ...productInCart, ...filteredArray[0] });
  });
  cartItem.map((item) => delete item._id);
  return cartItem;
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  let totalCost = 0;
  items.map((item) => (totalCost += item.cost * item.qty));
  return totalCost;
};

// TODO: CRIO_TASK_MODULE_CHECKOUT - Implement function to return total cart quantity
/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  return items.length;
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 *
 * @param {Number} value
 *    Current quantity of product in cart
 *
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 *
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 *
 *
 */
const ItemQuantity = ({ value, handleAdd, handleDelete }) => {
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 *
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 *
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 *
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 *
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *
 */
const Cart = ({ products, items = [], handleQuantity, isReadOnly }) => {
  const history = useHistory();
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {generateCartItemsFrom(items, products).map((item) => (
          <Item
            img={item.image}
            name={item.name}
            qty={item.qty}
            cost={item.cost}
            key={item.productId}
            handleQuantity={handleQuantity}
            items={items}
            products={products}
            productId={item.productId}
            isReadOnly={isReadOnly}
          />
        ))}
        <Box className="width-for-smallScreen item-detail">
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(generateCartItemsFrom(items, products))}
          </Box>
        </Box>
        {isReadOnly ? null : (
          <Box
            display="flex"
            justifyContent="flex-end"
            className="cart-footer width-for-smallScreen"
          >
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => history.push("/checkout")}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
      {isReadOnly ? (
        <Box className="cart" sx={{pb: "1rem"}}>
          <Typography
            sx={{ padding: "0.7rem 1rem", fontWeight: 800, fontSize: "17px" }}
            variant="button"
            component="div"
          >
            Order Details
          </Typography>
          <Box className="width-for-smallScreen item-detail item-detailOrder">
            <Box color="#3C3C3C" alignSelf="center">
              Products
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
              {getTotalItems(items)}
            </Box>
          </Box>
          <Box className="width-for-smallScreen item-detail item-detailOrder">
            <Box color="#3C3C3C" alignSelf="center">
              Subtotal
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
            ${getTotalCartValue(generateCartItemsFrom(items, products))}
            </Box>
          </Box>
          <Box className="width-for-smallScreen item-detail item-detailOrder">
            <Box color="#3C3C3C" alignSelf="center">
              Shipping Charges
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
              0
            </Box>
          </Box>
          <Box
            sx={{ fontWeight: 600 }}
            className="width-for-smallScreen item-detail item-detailOrder"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Total
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
            ${getTotalCartValue(generateCartItemsFrom(items, products))}
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Cart;
