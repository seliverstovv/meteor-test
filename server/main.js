import { Meteor } from 'meteor/meteor';
import '/imports/api/tasksMethods';
import '/imports/api/tasksPublications';

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
