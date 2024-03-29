import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadChannels } from '../../store/channels';
import ChannelChat from '../LiveChat/ChannelChat';
import ServerNameDropDown from '../ServersDropDown';
import CreateChannelModal from './CreateChannelModal'
import EditChannelModal from './EditChannelModal'
import { loadSingleUserServers } from "../../store/servers";
import LogoutButton from '../auth/LogoutButton';
import './ChannelsNavBar.css';

const ChannelsNavBar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [channelExists, setChannelExists] = useState(true)

    let { channelId } = useParams();


    const user = useSelector(state => state?.session?.user);
    const serversObj = useSelector(state => state['servers']['user-servers']);
    const userServersArr = serversObj ? Object.values(serversObj) : null

    let server = userServersArr?.filter(server => {
        return (server.id === Number(serverId))
    })

    // console.log(server ? server[0] : null)

    server = server ? server[0] : null

    // console.log(server)

    //moving user from server to channel

    const allChannels = useSelector(state => state.channels)
    const allChannelsArr = Object.values(allChannels)

    const channels = allChannelsArr.filter(channel => {
        return channel['server_id'] === Number(serverId);
    })


    useEffect(() => {
        if (user) dispatch(loadSingleUserServers(user.id));
    }, [dispatch, user])

    useEffect(() => {
        dispatch(loadChannels(serverId));
    }, [dispatch, serverId])


    useEffect(() => {
        if (!channelId) {
            setChannelExists(false)
        } else {
            setChannelExists(true)
        }
    }, [channelId])


    return (
        <>
            <div className='channels-container'>
                <div className='server-name-in-channel-div'>
                    <ServerNameDropDown server={server} />
                </div>
                <div className='channels-navbar'>
                    <h4 className='text-channels'>CHANNELS</h4>
                    <CreateChannelModal />
                </div>

                {channels && channels.map(channel => (
                    <ul className='single-channel-div' key={channel.id}>
                        <div className='channels-box' >
                            <NavLink className={'channels'} to={`/channels/${serverId}/${channel.id}`}>
                                <li className={!(Number(channelId)=== channel.id )? 'channel-name': 'selected-channel'} key={channel.id}># {channel.name}</li>
                            </NavLink>
                        </div>
                        <EditChannelModal channel={channel} setChannelExists={setChannelExists} />
                    </ul>
                ))}
                <div className="display-user-channel">
                    <h2 className='channel-username'>{user.username}</h2>
                    <LogoutButton />
                </div>
            </div>

            {channelExists && (
                <div className='live-chat-container'>
                    <ChannelChat />
                </div>
            )}
        </>

    )
}

export default ChannelsNavBar;
