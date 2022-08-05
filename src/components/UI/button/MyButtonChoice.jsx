import React from 'react';
import classes from "./MyButton.module.css";

const MyButtonChoice = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonChoice} >
            {children}
        </button>
    );
};

export default MyButtonChoice;