import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import { Box, Flex, Text, Avatar, Button, Divider } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <Box
        onClick={() => selectedUserHandler(user)}
        w="300px"
        bg={selectedUser?._id === user?._id ? "gray.200" : "transparent"}
        color="black"
        _hover={{ bg: "gray.200" }}
        display="flex"
        gap={2}
        alignItems="center"
        rounded="md"
        p={2}
        cursor="pointer"
      >
        <Box className={`avatar ${isOnline ? "online" : ""}`}>
          <Avatar
            size="md"
            src={
              user?.profilePhoto
                ? user.profilePhoto
                : "https://www.freeiconspng.com/uploads/no-image-icon-4.png"
            }
            alt="user-profile"
          />
        </Box>
        <Flex direction="column" flex="1">
          <Flex direction="column" justifyContent="space-between" gap={0}>
            <Text fontSize="16px">{user?.fullName}</Text>
            <Text fontSize="12px" color="gray.400">
              {user?.username}
            </Text>
          </Flex>
        </Flex>
        <Button size="xs" leftIcon={<FaPaperPlane />}>
          Send request
        </Button>
      </Box>
      <Divider my={0} py={0} height="1px" w="300px" />
    </>
  );
};

export default OtherUser;
