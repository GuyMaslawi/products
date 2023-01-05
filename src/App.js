import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import ProductsList from "./components/products-list/ProductsList";
import SelectedProduct from "./components/selected-product/SelectedProduct";
import { Container } from "./App.style";
import { sortProducts } from "./redux/productsSlice";
import Toolbar from "./components/toolbar/Toolbar";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sortProducts());
  }, [dispatch]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Toolbar />
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={7}>
            <ProductsList />
          </Grid>
          <Grid item xs={5}>
            <SelectedProduct />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
