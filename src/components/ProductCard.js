import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card" sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        sx={{ objectFit: "cover", flex: 1 }}
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography
          className="card-name"
          variant="body.text"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {product.name}
        </Typography>
        <Typography className="card-cost" variant="h6">
          ${product.cost}
        </Typography>
        <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          className="card-button"
          size="small"
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
