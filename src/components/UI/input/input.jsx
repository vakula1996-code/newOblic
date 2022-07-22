import React from 'react';
import {TextField} from "@mui/material";



const Input = ({label,getData,value=null}) => {
    return (
        <TextField id="standard-basic" label={label} variant="standard" value={value} onChange={(event)=>getData(event)}/>
    );
};

export default Input;