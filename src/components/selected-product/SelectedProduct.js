import { createRef, useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Inventory2Outlined } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Error, Wrapper } from "./SelectedProduct.style";
import {
  addProduct,
  editProduct,
  setNewProductMode,
} from "../../redux/productsSlice";

const schema = yup.object({
  name: yup
    .string("name can be string only")
    .required("name is mandatory")
    .max(30, "name can be 30 characters maximum"),
  description: yup
    .string()
    .max(30, "description can be 200 characters maximum")
    .optional(),
  price: yup
    .number("price must be number only")
    .positive("price must be greater than zero")
    .integer("must be integer only")
    .required("price is mandatory"),
});

const SelectedProduct = () => {
  const inputRef = createRef(null);
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const isNewProduct = useSelector((state) => state.products.isNewProductMode);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    if (isNewProduct) {
      inputRef.current.focus();
    }
  }, [inputRef, isNewProduct]);

  useEffect(() => {
    let defaults = {
      name: selectedProduct?.name,
      description: selectedProduct?.description,
      price: selectedProduct?.price,
    };
    reset(defaults);
  }, [selectedProduct, reset]);

  const onSubmit = (data) => {
    if (selectedProduct) {
      dispatch(editProduct({ id: selectedProduct.id, data }));
    } else {
      dispatch(setNewProductMode(false));
      dispatch(addProduct(data));
    }
    reset();
  };

  const isSaveButtonDisabled =
    errors?.name?.message ||
    errors?.description?.message ||
    errors?.price?.message;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          <Grid item xs sx={{ mb: 3 }}>
            <Inventory2Outlined />
          </Grid>
          <Grid item xs sx={{ mb: 3 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField label="name" inputRef={inputRef} {...field} />
              )}
            />
            <Error>{errors?.name?.message}</Error>
          </Grid>
          <Grid item xs sx={{ mb: 3 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField label="description" {...field} />
              )}
            />
            <Error>{errors?.description?.message}</Error>
          </Grid>
          <Grid item xs sx={{ mb: 3 }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => <TextField label="price" {...field} />}
            />
            <Error>{errors?.price?.message}</Error>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSaveButtonDisabled}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Wrapper>
  );
};

export default SelectedProduct;
