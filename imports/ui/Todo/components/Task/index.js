import React from 'react';

export const Task = ({ task, toggleChecked, deleteTask }) => {
    return (
        <li>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    checked={task.isChecked}
                    onClick={() => toggleChecked(task)}
                    readOnly
                />
                <p style={{ margin: '0' }}>{task.text}</p>
                <button onClick={() => deleteTask(task._id)}>X</button>
            </span>
            <p style={{ fontSize: '12px' }}>{task.createdAt}</p>
        </li>
    );
};
