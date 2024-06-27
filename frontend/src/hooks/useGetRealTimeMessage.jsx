import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(store => store.socket);
    const dispatch = useDispatch();
    const messages = useSelector(store => store.message.messages);

    useEffect(() => {
        const handleMessage = (newMessage) => {
            console.log('New message received:', newMessage);
            dispatch(setMessages([...messages, newMessage]));
        };

        if (socket) {
            console.log('Setting up socket listener');
            socket.on("newMessage", handleMessage);
        } else {
            console.log('Socket not available');
        }

        return () => {
            if (socket) {
                console.log('Cleaning up socket listener');
                socket.off("newMessage", handleMessage);
            }
        };
    }, [socket, dispatch, messages]);
};

export default useGetRealTimeMessage;
