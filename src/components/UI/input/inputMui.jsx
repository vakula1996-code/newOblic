import React from 'react';
import {FormControl, FormHelperText, TextField} from "@mui/material";


const InputMui = ({label, getData, value ,error, errorLabel='*Обов`язкове поле'}) => {
    return (

                <FormControl error variant="standard">
                    <TextField           id="component-error" label={label} variant="standard" value={value}
                              onChange={(event) => getData(event)}
                              size='small' style={{minWidth: '100px'}}/>
                    {error === true
                        ? <FormHelperText id="component-error-text">{errorLabel}</FormHelperText>
                        : <></>
                    }
                </FormControl>


    );
};

export default InputMui;