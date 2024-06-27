import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from "react-redux";
import { Box } from '@chakra-ui/react';

const OtherUsers = () => {
  // my custom hook
  useGetOtherUsers();
  const { otherUsers } = useSelector(store => store.user);
  if (!otherUsers) return null; // early return in React

  return (
    <Box overflowY="auto" flex="1" p={4} w="350px">
      {otherUsers?.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </Box>
  );
}

export default OtherUsers;
