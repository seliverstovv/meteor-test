import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/tasks';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { FilterPanel } from './components/FilterPanel';

const deleteTask = (_id) => Meteor.call('tasks.remove', _id);

const toggleChecked = (task) => Meteor.call('tasks.setIsChecked', task._id, !task.isChecked);

export const Todo = () => {
    const user = useTracker(() => Meteor.user());

    const [hideCompleted, setHideCompleted] = useState(false);

    const hideCompletedFilter = { isChecked: { $ne: true } };

    const userFilter = user ? { userId: user._id } : {};

    const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

    const { taskList, pendingTasksCount, isLoading } = useTracker(() => {
        const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const taskList = TasksCollection.find(
            hideCompleted ? pendingOnlyFilter : userFilter,
            {
                sort: { createdAt: -1 },
            },
        ).fetch();
        const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

        return { taskList, pendingTasksCount };
    });

    if (isLoading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <p>Count - {pendingTasksCount}</p>
            <FilterPanel hideCompleted={hideCompleted} setHideCompleted={setHideCompleted}/>
            <TaskForm/>
            <TaskList taskList={taskList} deleteTask={deleteTask} toggleChecked={toggleChecked}/>
        </div>
    );
};
