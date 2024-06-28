import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Text, Avatar, IconButton, Divider, Tooltip } from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { setSelectedUser } from "../../redux/userSlice";

const RequestUser = ({ user }) => {
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
              user.userId.profilePhoto
                ? user.userId.profilePhoto
                : "https://www.freeiconspng.com/uploads/no-image-icon-4.png"
            }
            alt="user-profile"
          />
        </Box>
        <Flex direction="column" flex="1">
          <Flex direction="column" justifyContent="space-between" gap={0}>
            <Text fontSize="16px">{user?.userId.fullName}</Text>
            
          </Flex>
        </Flex>
        <Flex gap={2}>
          <Tooltip label="Accept" fontSize="md">
            <IconButton
              aria-label="Accept"
              icon={<FaCheck />}
              size="xs"
              colorScheme="green"
              onClick={(e) => {
                e.stopPropagation();
                // Handle accept logic here
              }}
            />
          </Tooltip>
          <Tooltip label="Reject" fontSize="md">
            <IconButton
              aria-label="Reject"
              icon={<FaTimes />}
              size="xs"
              colorScheme="red"
              onClick={(e) => {
                e.stopPropagation();
                // Handle reject logic here
              }}
            />
          </Tooltip>
        </Flex>
      </Box>
      <Divider my={0} py={0} height="1px" w="300px" />
    </>
  );
};

export default RequestUser;
