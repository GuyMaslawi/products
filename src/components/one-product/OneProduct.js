import { useDispatch } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Inventory2Outlined } from "@mui/icons-material";
import { Description, IconWrapper, Title, Wrapper } from "./OneProduct.style";
import { chooseProduct, removeProduct } from "../../redux/productsSlice";

const OneProduct = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(chooseProduct(item));
  };

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
    const storage = JSON.parse(localStorage.getItem("products"));
    const newArr = (storage ?? []).filter((item) => item.id !== id);
    localStorage.setItem("products", JSON.stringify(newArr));
  };

  return (
    <Wrapper
      item
      xs={12}
      container
      alignItems="center"
      key={item?.id}
      onClick={() => handleClick(item)}
    >
      <Grid item xs={2}>
        <Inventory2Outlined />
      </Grid>
      <Grid item xs={12} sm={9} container direction="column">
        <Title>{item?.name}</Title>
        <Description>{item?.description}</Description>
      </Grid>
      <IconWrapper>
        <IconButton
          aria-label="delete"
          onClick={() => handleDelete(item?.id)} // dispatch(removeProduct(item?.id))
        >
          <DeleteIcon />
        </IconButton>
      </IconWrapper>
    </Wrapper>
  );
};

export default OneProduct;
