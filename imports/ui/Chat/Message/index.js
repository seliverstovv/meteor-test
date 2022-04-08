import React from 'react';

export const Message = ({ text, username, createdAt }) => {
    return (
        <div style={{ borderBottom: '2px solid gray' }}>
            <p style={{ color: 'tomato', fontWeight: 'bold' }}>{username}</p>
            <span>{text}</span>
            <span>{createdAt}</span>
        </div>
    );
};