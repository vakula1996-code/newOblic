import React from 'react';
import classes from "./MyButton.module.css";

const MyButtonRemove = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonRemove} >
            {children}
        </button>
    );
};

export default MyButtonRemove;