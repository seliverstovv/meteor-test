import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Todo } from './Todo';

export const App = () => {
    const user = useTracker(() => Meteor.user());
    console.log('user', user);

    const logout = () => Meteor.logout();

    if (user === undefined) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h1>My task tracker {user && <button onClick={logout}>LOGOUT</button>}</h1>
            {user ? (
                <>
                    <Todo/>
                </>
            ) : (
                <LoginForm/>
            )}
        </div>
    );
};
