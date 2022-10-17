import React, {useContext, useEffect, useState} from 'react';
import classes from "../table.module.css";
import MyInput from "../../input/MyInput";
import MyButtonRemove from "../../button/MyButtonRemove";
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TableDeregegistrationLook = observer(({list, error, filterId, setFilterId}) => {
    const [listMove, setListMove] = useState([])
    const [moveId, setMoveId] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setMoveId(technique.writingOffTechniqueId)
        setListMove(technique.writingOffTechnique)
    }, [technique.writingOffTechnique])

    const handleCountChange = (e, index) => {
        if (e.target.value.length === 0) {
            const list = [...moveId]
            list[index]['count'] = 0
            setMoveId(list)
        } else if (listMove[index].techniqueDetails.count < e.target.value) {
            const list = [...moveId]
            list[index]['count'] = parseInt(listMove[index].techniqueDetails.count)
            setMoveId(list)
        } else {
            const {value} = e.target
            const list = [...moveId]
            list[index]['count'] = parseInt(value)
            setMoveId(list)
        }

    }
    const handleRemove = (id) => {
        technique.setWritingOffTechnique(technique.writingOffTechnique.filter(item => item.id !== id))
        technique.setWritingOffTechniqueId(technique.writingOffTechniqueId.filter(item => item.id !== id))
        setFilterId((filterLocal) => filterLocal.filter(item => item.idTechniqueDetail !== id))
    }
    useEffect(() => {
        list(moveId)
    }, [moveId])
    useEffect(() => {
        if (error === '200') {
            setListMove([])
            setMoveId([])
        }
    }, [error])
    return (
        <div>
            {listMove.length
                ?
            <div className={classes.tableShow}>
                <h3>Список обраного майна для списання</h3>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>
                            Тип майна
                        </th>
                        <th>
                            Найменування
                        </th>
                        <th>
                            Одиниця виміру
                        </th>
                        <th>
                            Кількість
                        </th>
                        <th>
                            Кількість, яку передати
                        </th>

                        <th>Серійний номер</th>
                        <th>Ціна</th>
                        <th>Категорія</th>
                        <th>Дата створення</th>
                        <th>Дія</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listMove.map(({
                                       id,
                                       typeTechnique,
                                       nameTechniques,
                                       measurement,
                                       subdivision,
                                       techniqueDetails,
                                       count
                                   }, indexTechnique) =>
                        <tr key={id}>
                            <td>{indexTechnique + 1}</td>
                            <td>{typeTechnique}</td>
                            <td>{nameTechniques}</td>
                            <td>{measurement}</td>
                            <td>{techniqueDetails.count}</td>
                            <td>
                                {techniqueDetails.count > 1
                                    ?
                                    <MyInput value={moveId[indexTechnique].count}
                                             style={{textAlign: 'center', width: '50%'}}
                                             onChange={(e) => handleCountChange(e, indexTechnique)}/>
                                    : techniqueDetails.count
                                }
                            </td>
                            <td>{techniqueDetails.serialNumber}</td>
                            <td>{techniqueDetails.price}</td>
                            <td>{techniqueDetails.category}</td>
                            <td>{techniqueDetails.dateOfManufacture}</td>
                            <td>
                                <IconButton size='small'
                                            onClick={() => handleRemove(id)}><DeleteIcon></DeleteIcon></IconButton>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>




            </div>
                : <h2>Добавте майно для передачі</h2>
            }
        </div>

    );
});

export default TableDeregegistrationLook;