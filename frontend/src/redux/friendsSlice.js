import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  status: 'idle',
  error: null,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
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

export const { setFriends, setLoading, setError } = friendsSlice.actions;
export default friendsSlice.reducer;
