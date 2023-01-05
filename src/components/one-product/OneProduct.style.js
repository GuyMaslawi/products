import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const Wrapper = styled(Grid)({
  transition: "all 0.2s",
  boxShadow: "0 6px 10px rgba(0, 0, 0, 0.25)",
  marginBlockEnd: "20px",
  borderRadius: "7px",
  padding: "10px 20px",
  cursor: "pointer",
  position: "relative",
  marginInlineEnd: "20px",
  backgroundColor: "#FFDEE9",
  backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 50%)",
});

export const Title = styled("h3")({
  fontSize: "18px",
});

export const Description = styled("p")({
  fontSize: "14px",
  margin: 0,
});

export const IconWrapper = styled("div")({
  position: "absolute",
  zIndex: 1,
  right: "5px",
});
