import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../auth/LoginForm';
import { NavLink } from 'react-router-dom';
import "./LoginModal.css"
function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);


    return (
        <>
            <button
                className='log-in-splash-btn'
                onClick={() => setShowModal(true)}>Login
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                    <NavLink className='form-misc' to='/sign-up' exact={true} activeClassName='active' style={{ textDecoration: 'none' }}>
                    <button className='close-button' onClick={handleClose} >Don't have an account?  Sign up here!</button>
                    </NavLink>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
