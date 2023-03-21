import { Typography, useTheme } from "@mui/material";
import Flex from "../../components/flex";
import Wrapper from "../../components/wrapper";
import React from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  return (
    <Wrapper>
      <Flex>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored By
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </Flex>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
    </Wrapper>
  );
};

export default AdvertWidget;