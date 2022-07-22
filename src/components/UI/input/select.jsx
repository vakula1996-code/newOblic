import React, {useContext} from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const MySelect = observer(({label, value = null, getData, nameSelect, name}) => {

    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    return (
        <FormControl variant="standard" sx={{m: 1, minWidth: 100}}>
            <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                onChange={(e) => getData(e)}
            >
                {(document[nameSelect] !== undefined)
                    ?
                    document[nameSelect].map(data =>
                        <MenuItem key={data.id} value={data.id}>{data[name]}</MenuItem>)
                    :
                    technique[nameSelect].map(data =>
                        <MenuItem key={data.id} value={data.id}>{data[name]}</MenuItem>)

                }


            </Select>
        </FormControl>
    );
});

export default MySelect;