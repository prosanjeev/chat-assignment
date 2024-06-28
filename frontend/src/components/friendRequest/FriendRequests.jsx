import { useSelector } from "react-redux";
import { Box } from '@chakra-ui/react';
import RequestUser from './RequestUser';
import useGetFriendRequests from '../../hooks/useGetFriendRequests';

const FriendRequests = () => {
     // my custom hook
     useGetFriendRequests();
  const { friendRequests } = useSelector(store => store.friendsRequest);
  if (!friendRequests) return null; // early return in React

  return (
     <Box overflowY="auto" flex="1" p={4} bg='white'  >
      {friendRequests?.map((user) => (
        <RequestUser key={user._id} user={user} />
      ))}
    </Box>
  )
}

export default FriendRequests