import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const Users = () => {
    const { userList, isLoading } = useTracker(() => {
        const noDataAvailable = { userList: [] };
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('allUsers');

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const userList = Meteor.users.find().fetch();

        return { userList };
    });

    return (
        <div style={{ flex: '0 0 20%', marginLeft: '10px' }}>
            <h3>Users</h3>
            {isLoading ? (
                <div>loading...</div>
            ) : (
                userList.map((user) => (
                    <>
                        <p>NAME: {user.username}</p>
                        <p>ID: {user._id}</p>
                    </>
                ))
            )}
        </div>
    );
};