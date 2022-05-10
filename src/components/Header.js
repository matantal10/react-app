import React from "react";
import Button from "./Button";
import {useLocation} from "react-router-dom";

const Header = ({ showAddTask, onShowAdd }) => {


    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            <Button name={showAddTask ?'Close' : 'Add'} color={showAddTask ?'red' : 'blue'} onClick={onShowAdd}/>
        </header>
    )
}

export default Header


