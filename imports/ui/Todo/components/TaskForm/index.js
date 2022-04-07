import React, { useState } from 'react';

export const TaskForm = () => {
    const [text, setText] = useState('');
    const isDisabledSubmit = text.trim().length === 0;

    const handleSubmit = e => {
        e.preventDefault();

        if (isDisabledSubmit) return;

        Meteor.call('tasks.insert', text);

        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type to add new tasks"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit" disabled={isDisabledSubmit}>Add Task</button>
        </form>
    );
};