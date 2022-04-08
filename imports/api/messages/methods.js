import { check } from 'meteor/check';
import { MessageCollection } from '/imports/db/messages';

Meteor.methods({
    'messages.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const { username } = Meteor.user();

        MessageCollection.insert({
            text,
            createdAt: new Date(Date.now()).toTimeString(),
            username,
        });
    },

    'messages.remove'(messageId) {
        check(messageId, String);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const task = MessageCollection.findOne({ _id: messageId, userName: this.userName });

        if (!task) {
            throw new Meteor.Error('Access denied.');
        }

        MessageCollection.remove(messageId);
    },
});