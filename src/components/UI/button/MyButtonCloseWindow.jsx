import React from 'react';
import classes from "./MyButton.module.css";

const MyButtonCloseWindow = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonCloseWindow} >
            {children}
        </button>
    );
};

export default MyButtonCloseWindow;