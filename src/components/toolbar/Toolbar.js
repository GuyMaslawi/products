import { useCallback, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SORTING_PRODUCTS } from "../../mock-data/products";
import {
  setSortValue,
  sortProducts,
  chooseProduct,
  setNewProductMode,
  filterProducts,
} from "../../redux/productsSlice";

const Toolbar = () => {
  const sortValue = useSelector((state) => state.products.sortValue);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search_value") ?? ""
  );

  const sortType = localStorage.getItem("sortType") ?? sortValue;

  useEffect(() => {
    if (localStorage.getItem("search_value") !== null) {
      dispatch(filterProducts(localStorage.getItem("search_value")));
    }
  }, [dispatch]);

  const handleChange = useCallback(
    (e) => {
      const inputValue = e.target.value;
      localStorage.setItem("search_value", inputValue);
      setSearchValue(inputValue);
      dispatch(filterProducts(inputValue));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (value) => {
      dispatch(setSortValue(value));
      dispatch(sortProducts());
      localStorage.setItem("sortType", value);
    },
    [dispatch]
  );

  const handleNewProduct = useCallback(() => {
    dispatch(chooseProduct(null));
    dispatch(setNewProductMode(true));
  }, [dispatch]);

  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={handleNewProduct}>
          Add
        </Button>
      </Grid>
      <Grid item xs>
        <TextField
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={searchValue}
        />
      </Grid>
      <Grid item xs>
        <FormControl fullWidth>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={sortType}
            label="Sort by"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            {(SORTING_PRODUCTS ?? []).map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
