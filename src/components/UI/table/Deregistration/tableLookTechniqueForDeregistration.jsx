import React, {useContext, useEffect, useState} from 'react';
import MyButtonRemove from "../../button/MyButtonRemove";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import classes from "../table.module.css";

const TableLookTechniqueForDeregistration = observer(() => {
    const [listMove, setListMove] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setListMove(technique.listDeregistrationTechnique)
    }, [technique.listDeregistrationTechnique])
    const handleRemove = (index) => {
        const list = [...technique.listDeregistrationTechnique]
        const listId = [...technique.listDeregistrationTechniqueId]
        list.splice(index, 1)
        listId.splice(index, 1)
        technique.setListDeregistrationTechnique(list)
        technique.setListDeregistrationTechniqueId(listId)
    }
    return (
        <div>
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