import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";
import { Box } from '@chakra-ui/react';
import RequestUser from './RequestUser';

const FriendRequests = () => {
     // my custom hook
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user);
  if (!otherUsers) return null; // early return in React

  return (
     <Box overflowY="auto" flex="1" p={4} bg='white'  >
      {otherUsers?.map((user) => (
        <RequestUser key={user._id} user={user} />
      ))}
    </Box>
  )
}

export default FriendRequests