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
  }, []);



  return (
    <>
      <div className='user-list-container'>
      <div className='direct-messages'>Direct Messages</div>
        <div className='user-box'>
          {usersList && usersList.map(user => (
            <div className={(Number(userId) === user.id)? 'selected-user':'user-list'} key={user.id}>

              {/* <div className='username-div' > */}
                <NavLink to={`/channels/@me/${user.id}`} style={{ textDecoration: 'none' }} className="dm-user">
                  <div className='userslist-username' key={user.id}>{user.username}</div>
                </NavLink>
              {/* </div> */}
            </div>
          ))}
          {/* {chat && <DmChat />} */}
        </div>
          <div className="display-user">
              <h2 className='channel-username'>{sessionUser.username}</h2>
              <LogoutButton />
          </div>
      </div>
    </>
  );
}

export default UsersList;
