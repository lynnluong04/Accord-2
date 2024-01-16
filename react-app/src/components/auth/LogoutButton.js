import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return (
    <>
      <button className='logout-btn' onClick={onLogout}>
        <i className="fa-solid fa-gear" id="logout-btn-gear"></i>
      </button>
    </>
  )
};

export default LogoutButton;
