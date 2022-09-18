import React from 'react';
import classes from './table.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import StorageIcon from '@mui/icons-material/Storage';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const TableNameDocument = ({data, name}) => {
    return (
        <div>
            <h3>Назви документів</h3>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Назва</th>
                    <th>            <IconButton size='small'><SaveAltIcon></SaveAltIcon></IconButton>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((data,index,{id}) =>
                        <tr key={id}>
                            <td>{index+1}</td>
                            <td>{data[name]}</td>
                            <td>
                                <IconButton size='small'><StorageIcon></StorageIcon></IconButton>
                                <IconButton size='small'><DeleteIcon></DeleteIcon></IconButton>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>


        </div>
    );
};

export default TableNameDocument;