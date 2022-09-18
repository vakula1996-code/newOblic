import React, {useContext} from 'react';
import {FormControl, FormHelperText, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const MySelect = observer(({
                               label,
                               value = null,
                               getData,
                               nameSelect,
                               selectName,
                               name,
                               error = false,
                               errorLabel = '*Обов`язкове поле'
                           }) => {

    const {documents} = useContext(Context)
    const {technique} = useContext(Context)
    return (
        <div>
            <FormControl variant="standard" sx={{m: 1, minWidth: 100}}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={value}
                    name={selectName}
                    onChange={(e, child) => getData(e, child)}
                >
                    {(documents[nameSelect] !== undefined)
                        ?
                        documents[nameSelect].map(data =>
                            <MenuItem key={data.id} value={data.id}>{data[name]}</MenuItem>)
                        :
                        technique[nameSelect].map(data =>
                            <MenuItem key={data.id} value={data.id}>{data[name]}</MenuItem>)

                    }


                </Select>
                {error === true
                    ? <FormHelperText id="component-error-text" style={{color: '#d32f2f'}}>{errorLabel}</FormHelperText>
                    : <></>
                }
            </FormControl>

        </div>
    );
});

export default MySelect;