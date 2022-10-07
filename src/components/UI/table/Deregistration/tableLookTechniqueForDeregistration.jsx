import React, {useContext, useEffect, useState} from 'react';
import MyButtonRemove from "../../button/MyButtonRemove";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import classes from "../table.module.css";

const TableLookTechniqueForDeregistration = observer(({setFilterId}) => {
    const [listMove, setListMove] = useState([])
    const [moveId, setMoveId] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setListMove(technique.listDeregistrationTechnique)
        setMoveId(technique.listDeregistrationTechniqueId)
    }, [technique.listDeregistrationTechnique])
    const handleRemove = (index) => {
        const list = [...technique.listDeregistrationTechnique]
        const listId = [...technique.listDeregistrationTechniqueId]
        list.splice(index, 1)
        listId.splice(index, 1)
        technique.setListDeregistrationTechnique(list)
        technique.setListDeregistrationTechniqueId(listId)
        setFilterId([])
    }

    return (
        <div>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>
                        Тип
                    </th>
                    <th>
                        Найменування
                    </th>
                    <th>
                        Підрозділ, де знаходиться
                    </th>
                    <th>
                        Одиниця виміру
                    </th>
                    <th>
                        Кількість
                    </th>
                    <th>Серійний номер</th>
                    <th>Ціна за одниницю</th>
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
                               }, indexTechnique) =>
                    <tr key={indexTechnique}>
                        <td>{indexTechnique + 1}</td>
                        <td>{typeTechnique}</td>
                        <td>{nameTechniques}</td>
                        <td>{subdivision}</td>
                        <td>{measurement}</td>
                        <td>{1}</td>
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
    );
});

export default TableLookTechniqueForDeregistration;