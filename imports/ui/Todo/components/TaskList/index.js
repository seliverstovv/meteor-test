import React from 'react';
import { Task } from '../Task';

export const TaskList = ({ taskList, deleteTask, toggleChecked }) => {
    return (
        <ul>
            {taskList.length !== 0 && (
                taskList.map((task) => (
                    <Task key={task._id} task={task} deleteTask={deleteTask} toggleChecked={toggleChecked}/>
                ))
            ) || <p>Нет задач</p>}
        </ul>
    );
};
