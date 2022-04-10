import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

export const Links = () => {
    const logout = () => Meteor.logout();
    const { pathname } = useLocation();

    return (
        <>
            {pathname === '/' && <Navigate replace to="/chat"/>}
            <Link to="/todo">Todo</Link>
            <Link to="/chat">Chat</Link>
            <button onClick={logout}>LOGOUT</button>
        </>
    );
};