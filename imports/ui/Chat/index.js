import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MessageCollection } from '/imports/db/messages';
import { Message } from './Message';
import { MessageInput } from './MessageInput';

export const Chat = () => {
    const { messageList, isLoading } = useTracker(() => {
        const noDataAvailable = { messageList: [] };
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('messages');

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const messageList = MessageCollection.find({}, {}).fetch();

        return { messageList };
    });

    const handleSubmit = (text) => {
        Meteor.call('messages.insert', text);
    };

    return (
        <section style={{ border: '1px solid', flex: '0 1 30%', padding: '5px', marginLeft: '10px' }}>
            <h2>Chat</h2>
            <span style={{
                display: 'block',
                overflowY: 'auto',
                border: '1px solid tomato',
                height: '50%',
                marginBottom: '20px',
            }}>
                {isLoading ? (
                    <div>loading...</div>
                ) : (
                    messageList.map((message) => (
                        <Message
                            key={message._id}
                            username={message.username}
                            text={message.text}
                            createdAt={message.createdAt}
                        />
                    ))
                )}
            </span>
            <MessageInput handleSubmit={handleSubmit}/>
        </section>
    );
};