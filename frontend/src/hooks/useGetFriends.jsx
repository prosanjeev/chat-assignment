import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from '..';
import { setFriends } from '../redux/friendsSlice';

const useGetFriends = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user/friends`);
                // store
                console.log("Friends -> ", res);
                dispatch(setFriends(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchFriends();
    }, [])

}

export default useGetFriends