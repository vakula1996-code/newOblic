import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import classes from "../table.module.css";
import MyInput from "../../input/MyInput";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const TableLookMove = observer(({list, error, filterId, setFilterId}) => {
    const [listMove, setListMove] = useState([])
    const [moveId, setMoveId] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setMoveId(technique.moveTechniqueId)
        setListMove(technique.moveTechnique)
    }, [technique.moveTechnique, technique.moveTechniqueId])

    const handleCountChange = (e, index) => {
        if (e.target.value.length === 0) {
            const list = [...moveId]
            list[index]['count'] = 0
            setMoveId(list)
        } else if (listMove[index].techniqueDetails.available < e.target.value) {
            const list = [...moveId]
            list[index]['count'] = parseInt(listMove[index].techniqueDetails.available)
            setMoveId(list)
        } else {
            const {value} = e.target
            const list = [...moveId]
            list[index]['count'] = parseInt(value)
            setMoveId(list)
        }

    }
    const handleRemove = (id) => {
        technique.setMoveTechnique(technique.moveTechnique.filter(item => item.id !== id))
        technique.setMoveTechniqueId(technique.moveTechniqueId.filter(item => item.techniqueDetailId !== id))
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
            <h3>Список обраного майна для передачі</h3>
            <div className={classes.tableScroll}>
                <table width={'100%'}>
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
                            Доступно
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
                                       count,
                                       available
                                   }, indexTechnique) =>
                        <tr key={id}>
                            <td>{indexTechnique + 1}</td>
                            <td>{typeTechnique}</td>
                            <td>{nameTechniques}</td>
                            <td>{measurement}</td>
                            <td>{techniqueDetails.count}</td>
                            <td>{techniqueDetails.available}</td>
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

                {listMove.length
                    ? <></>
                    : <h2>Добавте майно для передачі</h2>
                }
            </div>

        </div>)
        ;
});

export default TableLookMove;