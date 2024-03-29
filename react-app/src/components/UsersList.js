import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './UsersList.css'

function UsersList() {

  const [users, setUsers] = useState([]);
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const usersList = users?.filter(user => {
    return (user.id !== sessionUser.id)
  })

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [userId]);



  return (
    <>
      <div className='user-list-container'>
        <div className='direct-messages'>Direct Messages</div>
        <div className='user-box'>
          {usersList && usersList.map(user => (
            <NavLink to={`/channels/@me/${user.id}`}
                     style={{ textDecoration: 'none' }}
                     className={(Number(userId) === user.id) ? 'selected-user' : 'user-list'}
                     key={user.id}>
              <div className='userslist-username'>{user.username}</div>
            </NavLink>
          ))}
          {/* {chat && <DmChat />} */}
        </div>
        <div className="display-user">
          <h2 className='channel-username'>{sessionUser.username}</h2>
          <LogoutButton/>
        </div>
      </div>
    </>
  );
}

export default UsersList;
