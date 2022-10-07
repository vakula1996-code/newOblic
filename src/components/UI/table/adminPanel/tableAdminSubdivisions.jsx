import React from 'react';
import classes from "./table.module.css";
import IconButton from "@mui/material/IconButton";
import StorageIcon from "@mui/icons-material/Storage";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";


const TableAdminSubdivisions = ({setModalTechnique, data, setData, setIdSubdivision}) => {


    const handleChange = (id) => {
        setModalTechnique(true)
        setIdSubdivision(id)
    }
    const handleAddItem = () => {
        setModalTechnique(true)
        setIdSubdivision('')
    }

    const onDelete = (id) => {
        setData(data.filter(item => item.id !== id))
    }

    return (
        <div>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Підрозділ</th>
                    <th>Кому підпорядковується</th>
                    <th>Дія
                        <IconButton><AddBoxIcon
                            style={{margin: 'auto'}}
                            onClick={handleAddItem}
                        ></AddBoxIcon></IconButton>
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map(({id, subdivision, subordination}, index) =>
                    <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{subdivision}</td>
                        <td>{subordination}</td>
                        <td>
                            <IconButton size='small'
                                        onClick={() => handleChange(id)}><StorageIcon></StorageIcon></IconButton>
                            <IconButton size='small'
                                        onClick={() => onDelete(id)}
                            ><DeleteIcon></DeleteIcon></IconButton>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TableAdminSubdivisions;