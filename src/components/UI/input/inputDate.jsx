import * as React from 'react';
import classes from "./input.module.css";
import {FormControl, FormHelperText} from "@mui/material";

export default function InputDate({value, getData, error = false, errorLabel = '*Обов`язкове поле'}) {
    return (
        <div>
            {error === true
                ?
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <input className={classes.inputDate} type="date" value={value}
                       onChange={event => getData(event)}/>
                <FormHelperText id="component-error-text" style={{color: '#d32f2f'}}>{errorLabel}</FormHelperText>

            </FormControl>
                :
                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                    <input className={classes.inputDate} type="date" value={value}
                           onChange={event => getData(event)}/>
                </FormControl>
            }
        </div>


    );
}
