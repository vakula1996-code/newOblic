import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import classes from "../table.module.css";
import MyButtonRemove from "../../button/MyButtonRemove";
import MyInput from "../../input/MyInput";

const TableLookMove = observer(({list, error}) => {
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
            const {value} = e.target
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
    const handleRemove = (index) => {
        const list = [...technique.moveTechnique]
        const listId = [...technique.moveTechniqueId]
        list.splice(index, 1)
        listId.splice(index, 1)
        technique.setMoveTechnique(list)
        technique.setMoveTechniqueId(listId)
    }
    useEffect(() => {
        list(moveId)
    }, [moveId])
    useEffect(() => {
        if (error === 'Hello world') {
            setListMove([])
            setMoveId([])
        }
    }, [error])
    return (
        <div>
            <h3>Список вибраної техніки для передачі</h3>
            <div className={classes.tableScroll}>
                <table>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>
                            Тип техніки
                        </th>
                        <th>
                            Назва техніки
                        </th>
                        <th>
                            Підрозділ де знаходиться
                        </th>
                        <th>
                            Одиниці виміру
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
                                       typeTechnique,
                                       nameTechniques,
                                       measurement,
                                       subdivision,
                                       techniqueDetails,
                                       count
                                   }, indexTechnique) =>
                        <tr key={indexTechnique}>
                            <td>{indexTechnique + 1}</td>
                            <td>{typeTechnique}</td>
                            <td>{nameTechniques}</td>
                            <td>{subdivision}</td>
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
                                onClick={() => handleRemove(indexTechnique)}>Видалити</MyButtonRemove></td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {listMove.length
                    ? <></>
                    : <h2>Добавте техніку для передачі</h2>
                }
            </div>

        </div>)
        ;
});

export default TableLookMove;