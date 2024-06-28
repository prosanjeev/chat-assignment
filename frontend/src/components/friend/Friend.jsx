import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Divider,
  Stack,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";

const timeSince = (date) => {
  try {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  } catch (error) {
    console.error("Invalid date:", date);
    return "Invalid date";
  }
};

const Friend = ({friend}) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers?.includes(friend?._id);

  const selectedUserHandler = (friend) => {
    dispatch(setSelectedUser(friend));
  };

  return (
    <>
      <Flex
        onClick={() => selectedUserHandler(friend)}
        w={{ lg: "700px", base: "90vw" }}
        bg={selectedUser?._id === friend?._id ? "gray.200" : "transparent"}
        color="black"
        _hover={{ bg: "gray.200" }}
        gap={2}
        alignItems="center"
        rounded="md"
        p={2}
        cursor="pointer"
        justify="space-between"
      >
        <Flex gap={{ md: 4, base: 2 }} alignItems="center">
          <Box className={`avatar ${isOnline ? "online" : ""}`}>
            <Avatar size="md" src={friend?.friendId.profilePhoto} alt="friend-profile" />
          </Box>

          <Stack spacing={0}>
            <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="bold">
              {friend?.friendId.fullName}
            </Text>
            <Text fontSize={{ base: "12px", md: "14px" }} color="gray.400">
              {friend?.friendId.email}
            </Text>
          </Stack>
        </Flex>

        <Flex
          direction="row"
          alignItems="flex-end"
          gap={{ md: 20, base: 4 }}
          flexWrap="wrap"
        >
          <Button size="xs" variant="outline">
            Accepted
          </Button>
          <Stack
            fontSize={{ base: "10px", md: "12px" }}
            spacing={0}
            alignItems="flex-end"
          >
            <Text>Online</Text>
            {/* <Text>2ms ago</Text> */}
            <Text>{timeSince(friend?.friendId.lastLogin)}</Text>
          </Stack>
        </Flex>
      </Flex>
      <Divider my={0} py={0} height="1px" w={{ lg: "700px", base: "90vw" }} />
    </>
  )
}

export default Friend