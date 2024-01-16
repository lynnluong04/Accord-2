import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { loadDMHistory, sendDmMessage } from '../../store/chat';
import './Dms.css';

let socket;


const DmChat = () => {
    const dispatch = useDispatch();

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [users, setUsers] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const { userId } = useParams();
    let recipientId = Number(userId)

    const sessionUser = useSelector(state => state.session.user);
    const recipient = users?.filter(user => {
        return user.id === recipientId
    })[0];


    const dmHistoryObj = useSelector(state => state['chat']['dm-messages']);
    const dmHistory = dmHistoryObj ? Object.values(dmHistoryObj) : null;


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [])


    // putting the sessionUser id and recipient id into a combined string to make a unique room
    // console.log('sender ID: ', sessionUser.id);
    // console.log('recipientId: ', recipientId);
    const joinedId = [sessionUser.id, recipientId].sort();
    const roomId = `${joinedId[0]}-${joinedId[1]}`;
    // console.log('joining the two IDs: ', roomId);

    useEffect(() => {
        const errors = [];
        if (chatInput.length === 0) errors.push("Message body cannot be empty.");

        setValidationErrors(errors);
    }, [chatInput]);


    useEffect(() => {
        // create websocket
        socket = io();

        // Join the room once upon mounting or when the recipientId changes.
        if (recipientId && sessionUser) {
            socket.emit("dm_join", { username: sessionUser.username, dm_room_id: roomId });
        }

        // Listen for chat events
        const handleNewMessage = (chat) => {
            setMessages((messages) => [...messages, chat]);
        };

        socket.on('dm_chat', handleNewMessage);

        // Load DM history once upon mounting or when the recipientId changes.
        dispatch(loadDMHistory(sessionUser.id, recipientId));

        // Cleanup function for when the component unmounts or when the recipientId changes.
        return () => {
            socket.emit('dm_leave', { username: sessionUser.username, recipient: recipientId });
            socket.off('dm_chat', handleNewMessage);
            socket.disconnect();
        };
    }, [recipientId, dispatch, sessionUser, roomId]);

    const updateChatInput = e => {
        setChatInput(e.target.value);
    }

    const sendChat = async (e) => {
        e.preventDefault();

        if (validationErrors.length === 0) {
            //emit a message
            if (recipientId && sessionUser) socket.emit('dm_chat', { username: sessionUser.username, msg: chatInput, dm_room_id: roomId });

            const dateTime = new Date();
            const isoTime = dateTime.toISOString();
            const date = isoTime.slice(0, 10);
            const time = isoTime.slice(12, 19);
            const combined = date + ' ' + time

            const payload = {
                sender_id: sessionUser.id,
                recipient_id: recipientId,
                message_body: chatInput,
                created_at: combined
            }

            await dispatch(sendDmMessage(payload));
            setChatInput('');
        }


        //clear input field after message is sent
        setChatInput('');
    }


    return (
        // <div className='dm-chat-container'>
        <div className='dms-container'>
            <div className='dm-history-container'>
                {sessionUser && (
                    dmHistory && dmHistory?.map((message, idx) => (
                        <div className='single-dm' key={idx}>
                            <div className='dm-name'>

                                {message.sender_id === sessionUser.id ?
                                    sessionUser?.username :
                                    recipient?.username}
                            </div>
                            <div className='msg-body' >
                                {message.message_body ?
                                    message?.message_body :
                                    message?.msg}
                            </div>
                        </div>
                    ))

                )}
            </div>

            <div className='chat-box-container'>
                <form
                    onSubmit={sendChat}
                    id='chat-box-form'
                >
                    <input
                        placeholder={`Message ${recipient?.username}`}
                        value={chatInput}
                        onChange={updateChatInput}
                    />
                    {/* <button>Send</button> */}
                </form>
            </div>
        </div>
        // </div>
    )
}

export default DmChat;
