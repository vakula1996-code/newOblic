import React from 'react';
import classes from "./MyButton.module.css";

const MyButtonNotActivated = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonNotActive} disabled>
            {children}
        </button>
    );
};

export default MyButtonNotActivated;