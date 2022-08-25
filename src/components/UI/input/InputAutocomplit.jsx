import React, {useEffect, useState, useContext} from 'react';
import {Autocomplete, FormControl, FormHelperText, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const InputAutocomplit = observer(({label,getData, value, error, errorLabel = '*Обов`язкове поле'}) => {
    const [data, setData] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setData(technique.nameTechnique)
    }, [technique.nameTechnique])
    return (
        <FormControl error variant="standard">
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={data.map((data) => data.techniqueName)}
                style={{minWidth: 200}}
                renderInput={(params) => <TextField {...params} label={label}/>}
                onChange={(event) => getData(event)}
                value={value}
            />
            {error === true
                ? <FormHelperText id="component-error-text">{errorLabel}</FormHelperText>
                : <></>
            }
        </FormControl>
    );
});

export default InputAutocomplit;