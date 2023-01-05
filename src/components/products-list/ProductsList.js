import { useCallback } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import OneProduct from "../one-product/OneProduct";

const ProductsList = () => {
  const products = useSelector((state) => state.products.list);
  const filteredProducts = useSelector((state) => state.products.filteredList);

  const RenderProducts = useCallback(
    () =>
      (filteredProducts ?? products).map((item) => {
        return <OneProduct key={item.id} item={item} />;
      }),
    [filteredProducts, products]
  );

  return (
    <Grid container direction="column">
      <RenderProducts />
    </Grid>
  );
};

export default ProductsList;
