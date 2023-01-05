import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS } from "../mock-data/products";

const initialState = {
  list: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : PRODUCTS,
  filteredList: null,
  selectedProduct: null,
  sortValue: "",
  isNewProductMode: false,
};

export const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const data = action.payload;
      const product = {
        id: state.list.length + 1,
        ...data,
      };
      state.list.push(product);
      localStorage.setItem("products", JSON.stringify(state.list));
    },
    editProduct: (state, action) => {
      const { id, data } = action.payload;
      const arr = state.list?.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...data,
          };
        }
        return item;
      });
      state.list = arr;
      localStorage.setItem("products", JSON.stringify(state.list));
    },

    removeProduct: (state, action) => {
      const id = action.payload;
      state.list = state.list?.filter((item) => item.id !== id);
    },
    chooseProduct: (state, action) => {
      const data = action.payload;
      state.selectedProduct = data;
    },
    setSortValue: (state, action) => {
      const sortType = action.payload;
      state.sortValue = sortType;
    },
    sortProducts: (state, action) => {
      let sortType = state.sortValue;
      let sortedArr = state.list?.sort((a, b) => a[sortType] - b[sortType]);
      state.list = sortedArr;
    },
    setNewProductMode: (state, action) => {
      const isNewProduct = action.payload;
      state.isNewProductMode = isNewProduct;
    },
    filterProducts: (state, action) => {
      const value = action.payload;
      let arr = state.list?.filter((item) =>
        item.name.toLowerCase().includes(value)
      );
      state.filteredList = arr;
    },
  },
});

export const {
  addProduct,
  editProduct,
  removeProduct,
  chooseProduct,
  sortProducts,
  setSortValue,
  setNewProductMode,
  filterProducts,
} = ProductsSlice.actions;

export default ProductsSlice.reducer;
