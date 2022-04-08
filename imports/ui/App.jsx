import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './Login';
import { Todo } from './Todo';
import { Chat } from './Chat';
import { Users } from './Users';

export const App = () => {
    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

    if (user === undefined) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h1>My task tracker and chat {user && <button onClick={logout}>LOGOUT</button>}</h1>
            {user ? (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Todo/>
                    <Chat/>
                    <Users/>
                </div>
            ) : (
                <LoginForm/>
            )}
        </div>
    );
};
