import React, { useState } from 'react';

export const MessageInput = ({ handleSubmit }) => {
    const [text, setText] = useState('');
    const isDisabledSubmit = text.trim().length === 0;

    const addMessageHandler = (e) => {
        e.preventDefault();
        handleSubmit(text);
        setText('');
    };

    return (
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={addMessageHandler} disabled={isDisabledSubmit}>Send</button>
        </div>
    );
};