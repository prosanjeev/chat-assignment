import { useDispatch, useSelector } from "react-redux";
import { Box, Flex, Text, Spinner, Avatar, Stack } from "@chakra-ui/react";
import Friend from "./Friend";
import useGetFriends from "../../hooks/useGetFriends";


const Friends = () => {
  // my custom hook
  useGetFriends();
  const { friends } = useSelector((store) => store.friends);
  if (!friends) return null; // early return in React

  return (
    <Box overflowY="auto" flex="1" p={4} bg="white">
      {friends && friends.length > 0 ? (
        friends.map(friend => (
          <Friend key={friend._id} friend={friend} />
        ))
      ) : (
        <Text textAlign="center" fontSize="xl" mt={8} w={{ lg: "700px", base: "90vw" }}>
          You have no friends.
        </Text>
      )}
    </Box>
  );
};

export default Friends;
