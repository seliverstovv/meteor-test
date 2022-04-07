import React from 'react';

export const FilterPanel = ({ hideCompleted, setHideCompleted }) => {
    return (
        <div>
            <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
            </button>
        </div>
    );
};