import React from 'react';
import {FormControl, FormHelperText, TextField} from "@mui/material";


const InputMui = ({label, getData, value = null, error = false, errorLabel='*Обов`язкове поле'}) => {
    return (
        <div>
            {error === true
                ?
                <FormControl error variant="standard">
                    <TextField           id="component-error" label={label} variant="standard" value={value}
                              onChange={(event) => getData(event)}
                              size='small' style={{minWidth: '100px'}}/>
                    <FormHelperText id="component-error-text">{errorLabel}</FormHelperText>
                </FormControl>
                : <TextField id="standard-basic" label={label} variant="standard" value={value}
                             onChange={(event) => getData(event)}
                             size='small' style={{minWidth: '100px'}}/>
            }
        </div>


    )
        ;
};

export default InputMui;