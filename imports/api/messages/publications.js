import { Meteor } from 'meteor/meteor';
import { MessageCollection } from '/imports/db/messages';

Meteor.publish('messages', function publishTasks() {
    return MessageCollection.find();
});