import React from 'react';
import PropTypes from 'prop-types';
import Task from "./task";


const Tasks = ({tasks, deleteTask, onToggle}) => {
    return (
        <div className='task'>
            {tasks.map((task) => (<Task key={task.id} task={task} deleteTask={deleteTask} onToggle={onToggle}/>))}
        </div>
    );
};

Tasks.propTypes = {

};

export default Tasks;