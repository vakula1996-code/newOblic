import React from 'react';
import classes from "./MyButton.module.css";

const MyButtonAdd = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonAdd} >
            {children}
        </button>
    );
};

export default MyButtonAdd;