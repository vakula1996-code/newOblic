import React, {useContext, useEffect, useState} from 'react';
import {Autocomplete, FormControl, FormHelperText, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const InputAutocomplit = observer(({label, getData, value = '', error, errorLabel = '*Обов`язкове поле',nameState}) => {
    const [data, setData] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setData(technique[nameState])
    }, [technique[nameState]])
    return (
        <FormControl error variant="standard">
            < Autocomplete
                freeSolo
                id="free-solo-demo"
                options={data.map((data) => data.techniqueName)}
                style={{minWidth: 200}}
                renderInput={(params) => <TextField {...params} label={label}/>}
                // onChange={(event) => getData(event)}
                onInputChange={(event) => getData(event)}
                // value={value}
                inputValue={value}
            />
            {error === true
                ? <FormHelperText id="component-error-text">{errorLabel}</FormHelperText>
                : <></>
            }
        </FormControl>
    );
});

export default InputAutocomplit;