import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import classes from "../table.module.css";
import MyButtonRemove from "../../button/MyButtonRemove";
import {observer} from "mobx-react-lite";
import MyInput from "../../input/MyInput";

const TableTechniqueExcluded = observer(() => {
    const [listMove, setListMove] = useState([])
    const [moveId, setMoveId] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setListMove(technique.listTechniqueForExcluded)
        setMoveId(technique.listTechniqueForExcludedId)
    }, [technique.listTechniqueForExcludedId])
    const handleRemove = (index) => {
        const list = [...technique.listTechniqueForExcluded]
        const listId = [...technique.listTechniqueForExcludedId]
        list.splice(index, 1)
        listId.splice(index, 1)
        technique.setListTechniqueForExcluded(list)
        technique.setListTechniqueForExcludeId(listId)
    }
    const handleCountChange = (e, index) => {
        if (e.target.value.length === 0) {
            const list = [...moveId]
            list[index]['count'] = 1
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
    return (
        listMove.length > 0
            ?
            <div>
                <h2>Засоби для модернізації</h2>
                <table className={classes.table}>
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
                            Кількість яку списати
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
                                             style={{textAlign: 'center', width: '80%'}}
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
            </div>
            : <></>
    );
});

export default TableTechniqueExcluded;