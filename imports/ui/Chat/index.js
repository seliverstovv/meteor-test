import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { MessageCollection } from '/imports/db/messages';
import { Message } from './Message';

export const Chat = () => {
    const [text, setText] = useState('');
    const isDisabledSubmit = text.trim().length === 0;

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

    const handleSubmit = e => {
        e.preventDefault();

        if (isDisabledSubmit) return;

        Meteor.call('messages.insert', text);

        setText('');
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
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                <button onClick={handleSubmit} disabled={isDisabledSubmit}>Send</button>
            </div>
        </section>
    );
};