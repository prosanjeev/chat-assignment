import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
    },
    reducers: {
        setSocket: (state, action) => {
            state.socket = action.payload; // This mutates the state, which should be avoided in Redux Toolkit
        },
        clearSocket: (state) => {
            state.socket = null; // Add a clearSocket reducer to reset the socket state
        },
    },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
