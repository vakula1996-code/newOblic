import React from 'react';
import classes from "./MyButton.module.css";

const MyButtonLookFilter = ({children, ...props}) => {
    return (
        <button {...props} className={classes.buttonLookFilters}>
            {children}
        </button>
    );
};

export default MyButtonLookFilter;