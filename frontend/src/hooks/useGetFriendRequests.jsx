import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from '..';
import { setFriendRequests } from '../redux/friendRequestSlice';

const useGetFriendRequests = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFriendsRequests = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user/friendRequests`);
                // store
                console.log("friendRequests -> ", res);
                dispatch(setFriendRequests(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchFriendsRequests();
    }, [])

}

export default useGetFriendRequests