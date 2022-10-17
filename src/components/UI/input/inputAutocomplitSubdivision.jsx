import React,{useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {Autocomplete, FormControl, FormHelperText, TextField} from "@mui/material";
import {observer} from "mobx-react-lite";

const InputAutocomplitSubdivision = observer(({label, getData, value = '', error, errorLabel = '*Обов`язкове поле',nameState}) => {
    const [data, setData] = useState([])
    const {documents} = useContext(Context)
    useEffect(() => {
        setData(documents[nameState])
    }, [documents[nameState]])
    return (
        <FormControl error variant="standard">
            {data.length > 0
                ?
                < Autocomplete
                    freeSolo
                    id="free-solo-demo"
                    options={data.map((data) => data.subdivisionName)}
                    style={{minWidth: 200}}
                    renderInput={(params) => <TextField {...params} label={label}/>}
                    // onChange={(event) => getData(event)}
                    onInputChange={(event) => getData(event)}
                    // value={value}
                    inputValue={value}
                />
                :
                <TextField
                    label={label}
                    style={{minWidth: 200}}
                    value={value}
                    onChange={(event)=>getData(event)}
                />
            }
            {error === true
                ? <FormHelperText id="component-error-text">{errorLabel}</FormHelperText>
                : <></>
            }
        </FormControl>
    );
});

export default InputAutocomplitSubdivision;