import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import NavBar from "../navBar/navBar.jsx";
import UserWidget from "../../scenes/widgets/UserWidget";
import React from "react";
import MyPostWidget from "../../scenes/widgets/MyPost";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import FriendList from "../../scenes/widgets/FriendList";

const HomePage = ()=>{
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);


    return(<Box>
        <NavBar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            <MyPostWidget picturePath={picturePath} />
            <PostsWidget userId={_id} />
          </Box>
          {isNonMobileScreens && (
            <Box flexBasis="26%">
              <Box m="2rem 0" />
              <FriendList userId={_id} />
            </Box>
          )}
        </Box>
      </Box>
    );
}
export default HomePage;