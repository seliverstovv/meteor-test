import { Meteor } from 'meteor/meteor';
import '/imports/api/tasks/methods';
import '/imports/api/messages/methods';
import '/imports/api/tasks/publications';
import '/imports/api/messages/publications';
import '/imports/api/users/publications';

const testUsers = [
    {
        username: 'one',
        password: '1234',
    },
    {
        username: 'two',
        password: '1234',
    },
];

Meteor.startup(() => {
    testUsers.forEach(({ username, password }) => {
        if (!Accounts.findUserByUsername(username)) {
            Accounts.createUser({
                username,
                password,
            });
        }
    });
});
