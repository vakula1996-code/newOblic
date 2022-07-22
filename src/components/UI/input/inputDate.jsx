import * as React from 'react';
import classes from "./input.module.css";
import {FormControl} from "@mui/material";


export default function InputDate({value, getData}) {

    return (
        <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
            <input className={classes.inputDate} type="date" value={value}
                   onChange={event => getData(event)}/>
        </FormControl>

    );
}
