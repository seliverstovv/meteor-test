import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LoginForm } from './Login';
import { Todo } from './Todo';
import { Chat } from './Chat';
import { Users } from './Users';

const Links = () => {
    const logout = () => Meteor.logout();
    const { pathname } = useLocation();

    console.log('location', location);

    return (
        <>
            {pathname === '/' && <Navigate replace to="/chat"/>}
            <Link to="/todo">Todo</Link>
            <Link to="/chat">Chat</Link>
            <button onClick={logout}>LOGOUT</button>
        </>
    );
};

export const App = () => {
    const user = useTracker(() => Meteor.user());

    if (user === undefined) {
        return <div>loading...</div>;
    }

    return (
        <BrowserRouter>
            <Links/>
            <Routes>
                <Route path="todo" element={<Todo/>}/>
                <Route path="chat" element={<Chat/>}/>
                <Route path="login" element={<LoginForm/>}/>
            </Routes>
        </BrowserRouter>
    );
};

// <div>
//     <h1>My task tracker and chat {user && <button onClick={logout}>LOGOUT</button>}</h1>
//     {user ? (
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Todo/>
//             <Chat/>
//             <Users/>
//         </div>
//     ) : (
//         <LoginForm/>
//     )}
// </div>;