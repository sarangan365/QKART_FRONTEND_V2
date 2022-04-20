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
    <Card style={{
      
      width:410,
      boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fafafa",
    }} className="card" direction="column" sx={{ maxWidth: 400 }} md={{maxWidth: 410, maxHeight:800,}}>
      
        <CardMedia  style={{ height: "280px"}} component="img" image={product.image} sx={{ maxWidth: 400 }} md={{maxWidth: 420}}/>
        <CardActions className="card card-actions">
        <CardContent className="card">
          <div  style={{ paddingBottom:"2.5%"}}>
          <Typography gutterBottom  variant="h10">
            {product.name}
          </Typography>
          </div>
          <div  style={{ paddingBottom:"1.5%"}}>
          <Typography gutterBottom variant="h5">
           $ {product.cost}
          </Typography>
          </div>
          <div style={{ paddingBottom:"5%"}}>
            <Rating name="half-ratin" defaultValue={product.rating} precision={0.5} />
          </div>
          <div className="card-action">
          <Button size="small" className="card-button" variant="contained" startIcon={<AddShoppingCartOutlined/>}>ADD TO CART</Button>
          </div>
        </CardContent>
        </CardActions>
      
    </Card>
  );
};

export default ProductCard;
