import React, {useEffect, useState} from 'react';
import classes from './formAdmin.module.css'
import InputMui from "../../input/inputMui";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import {v4 as uuidv4} from "uuid";

const FormAdminSubdivision = ({data, setData, idSubdivision, setModalTechnique}) => {
    const [dataForId, setDataForId] = useState({
        subdivision: '',
        subordination: ''
    })
    console.log(dataForId)
    const filterData = () => {
        if (idSubdivision !== '') {
            setDataForId(data.filter(item => item.id === idSubdivision)[0])
        } else {
            setDataForId({
                subdivision: '',
                subordination: ''
            })
        }
    }
    const handleChange = (e, name) => {
        const {value} = e.target;
        const list = {...dataForId};
        list[name] = value
        setDataForId(list)
    }
    const save = () => {
        if (idSubdivision !== '') {
            setData(data.map(item => item.id === idSubdivision ? dataForId : item))
        } else {
            setData([
                ...data,
                {
                    id: uuidv4(),
                    subdivision: dataForId.subdivision,
                    subordination: dataForId.subordination
                }
            ])
        }
        setModalTechnique(false)

    }


    useEffect(() => {
        filterData()
    }, [idSubdivision])

    return (
        <div>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Підрозділ</th>
                    <th>Кому підпорядковується</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <InputMui
                            value={dataForId.subdivision}
                            getData={(e) => handleChange(e, 'subdivision')}
                        />
                    </td>
                    <td>
                        <InputMui
                            value={dataForId.subordination}
                            getData={(e) => handleChange(e, 'subordination')}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <IconButton size='small' onClick={save}>
                <SaveIcon></SaveIcon></IconButton>
        </div>
    );
};

export default FormAdminSubdivision;