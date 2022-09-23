import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import classes from "../table.module.css";
import MyButtonRemove from "../../button/MyButtonRemove";
import MyInput from "../../input/MyInput";

const TableLookMove = observer(({list, error, filterId, setFilterId}) => {
    const [listMove, setListMove] = useState([])
    const [moveId, setMoveId] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setMoveId(technique.moveTechniqueId)
        setListMove(technique.moveTechnique)
    }, [technique.moveTechnique])

    const handleCountChange = (e, index) => {
        if (e.target.value.length === 0) {
            const list = [...moveId]
            list[index]['count'] = null
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

    const handleRemove = (index, id) => {
        const list = [...listMove]
        const listId = [...moveId]
        list.splice(index, 1)
        listId.splice(index, 1)
        technique.setMoveTechnique(list)
        technique.setMoveTechniqueId(listId)
        const filterList = [...filterId]
        filterList.splice(index, 1)
        setFilterId(filterList)
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
                            Кількість яку передати
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
                                             style={{textAlign: 'center', width: '100%'}}
                                             onChange={(e) => handleCountChange(e, indexTechnique)}/>
                                    : techniqueDetails.count
                                }
                            </td>
                            <td>{techniqueDetails.serialNumber}</td>
                            <td>{techniqueDetails.price}</td>
                            <td>{techniqueDetails.category}</td>
                            <td>{techniqueDetails.dateOfManufacture}</td>
                            <td><MyButtonRemove
                                onClick={() => handleRemove(indexTechnique, id)}>Видалити</MyButtonRemove></td>
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