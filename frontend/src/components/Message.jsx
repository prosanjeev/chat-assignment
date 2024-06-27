import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        if (scroll.current) {
            scroll.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message]);

    if (!message) {
        return null;
    }

    const isAuthUser = message.senderId === authUser?._id;
    const profilePhoto = isAuthUser ? authUser?.profilePhoto : selectedUser?.profilePhoto;

    return (
        <div ref={scroll} className={`chat ${isAuthUser ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        alt="Chat bubble component"
                        src={profilePhoto || 'default-profile-photo-url'}
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className={`chat-bubble ${!isAuthUser ? 'bg-gray-200 text-black' : ''}`}>
                {message.message}
            </div>
        </div>
    );
}

export default Message;
