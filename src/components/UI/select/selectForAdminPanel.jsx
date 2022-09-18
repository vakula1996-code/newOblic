import React from 'react';
import {FormControl, FormHelperText, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const SelectForAdminPanel = () => {
    return (
        <div>
            <FormControl variant="standard" sx={{m: 1, minWidth: 100}}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}

                    onChange={(e,child) => getData(e,child)}
                >

                        .map(data =>
                            <MenuItem key={data.id} value={data.id} >{data[name]}</MenuItem>)


                </Select>
                {error === true
                    ? <FormHelperText id="component-error-text" style={{color: '#d32f2f'}}>{errorLabel}</FormHelperText>
                    : <></>
                }
            </FormControl>

        </div>
    );
};

export default SelectForAdminPanel;