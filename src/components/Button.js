import React from 'react';
import PropTypes from 'prop-types';


const Button = ({name, color, onClick}) => {
    return <button className='btn' onClick={onClick} style={{backgroundColor: color}}>{name}</button>
};

Button.defaultProps = {
    color: 'steelblue'
}


Button.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}
export default Button;
