import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friendRequests: [],
  status: 'idle',
  error: null,
};

const friendRequestSlice = createSlice({
  name: 'friendRequests',
  initialState,
  reducers: {
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
    setError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setFriendRequests, setLoading, setError } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;
