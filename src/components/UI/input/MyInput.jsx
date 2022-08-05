import React from 'react';
import classes from "./MyInput.module.css";

const MyInput = ({onChange,value,style,...props}) => {

    return (

        <input  onChange={onChange} style={style} value={value} className={classes.input}  />
    );
};

export default MyInput;