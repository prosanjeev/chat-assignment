import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtherUsers from "./OtherUsers";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Profile from "./Profile";
import RequestUser from "./RequestUser";
import FriendRequests from "./FriendRequests";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "..";

const HomePage = () => {
  const { authUser } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log(authUser);
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      // dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="space-between"
      width={{ base: "90vw", md: "64vw" }}
      mx="auto"
      height={{ base: "auto", md: "full" }}
      borderRadius="lg"
      overflow="hidden"
      bgClip="padding-box"
      backdropFilter="blur(10px)"
      bgOpacity="0.8"
      p={{ base: 4, md: 10 }}
    >
      <Stack width={{ base: "100%", md: "auto" }} overflow="hidden">
      <Flex justify="space-between" align="center">
        <Profile authUser={authUser} />
        <Text fontWeight="600" fontSize="18px" mx={2} onClick={logoutHandler} cursor="pointer">
          Sign Out
        </Text>
      </Flex>

      <Stack bg="white" p={{ base: 2, md: 2 }} mt={10} borderTopRadius={10}>
        <Text px={{ base: 4, md: 4 }} mt={2} fontSize="20px" fontWeight="600">
          Friend Requests
        </Text>
      </Stack>
        <FriendRequests />
    </Stack>

      <Stack w={{ base: "100%", md: "350px" }} bg="white" p={2} borderRadius={20} mt={{ base: 4, md: 0 }} display={{base:"none", md:"block"}}> 
        <Text px={4} mt={2} fontSize="20px" fontWeight="600">
          Other profiles
        </Text>
        <OtherUsers />
      </Stack>
    </Flex>
  );
};

export default HomePage;
