import React from 'react';
import {FormControl, FormHelperText, TextField} from "@mui/material";


const InputMui = ({name, label, getData, value, error, errorLabel = '*Обов`язкове поле', type = 'string'}) => {
    return (

        <FormControl error variant="standard">
            <TextField id="component-error" label={label} variant="standard" value={value}
                       name={name}
                       onChange={(event) => getData(event)}
                       size='small' style={{minWidth: '100px'}}
                       type={type}
            />
            {error === true
                ? <FormHelperText id="component-error-text">{errorLabel}</FormHelperText>
                : <></>
            }
        </FormControl>


    );
};

export default InputMui;