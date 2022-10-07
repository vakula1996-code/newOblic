import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import classes from "../table.module.css";
import MyButtonRemove from "../../button/MyButtonRemove";
import MyInput from "../../input/MyInput";

const TableTechniqueForModernization = observer(({filterId, setFilterId}) => {
    const [listMove, setListMove] = useState([])
    const [listMoveId, setListMoveId] = useState([])
    const {technique} = useContext(Context)
    useEffect(() => {
        setListMoveId(technique.listModernizationTechniqueId)
        setListMove(technique.listModernizationTechnique)
    }, [technique.listModernizationTechnique])
    console.log(technique.listModernizationTechniqueId, listMoveId)
    const handleRemove = (id) => {
        technique.setListModernizationTechnique(technique.listModernizationTechnique.filter(item => item.id !== id))
        technique.setListModernizationTechniqueId(technique.listModernizationTechniqueId.filter(item => item.id !== id))
        setFilterId((filterLocal) => filterLocal.filter(item => item.idTechniqueDetail !== id))
    }
    const handleCountChange = (e, index) => {
        if (e.target.value.length === 0) {
            const list = [...technique.listModernizationTechniqueId]
            list[index]['count'] = 0
            technique.setListModernizationTechniqueId(list)
        } else if (technique.listModernizationTechnique[index].techniqueDetails.count < e.target.value) {
            const {value} = e.target
            const list = [...technique.listModernizationTechniqueId]
            list[index]['count'] = parseInt(technique.listModernizationTechnique[index].techniqueDetails.count)
            technique.setListModernizationTechniqueId(list)
        } else {
            const {value} = e.target
            const list = [...technique.listModernizationTechniqueId]
            list[index]['count'] = parseInt(value)
            technique.setListModernizationTechniqueId(list)
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
                        <th>
                            Кількість, яку передати
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
                                       id,
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
                                    <MyInput value={technique.listModernizationTechniqueId[indexTechnique].count}
                                             style={{textAlign: 'center', width: '80%'}}
                                             onChange={(e) => handleCountChange(e, indexTechnique)}
                                    />
                                    : techniqueDetails.count
                                }
                            </td>
                            <td>{techniqueDetails.serialNumber}</td>
                            <td>{techniqueDetails.price}</td>
                            <td>{techniqueDetails.category}</td>
                            <td>{techniqueDetails.dateOfManufacture}</td>
                            <td><MyButtonRemove
                                onClick={() => handleRemove(id)}>Видалити</MyButtonRemove></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            : <></>
    );
});

export default TableTechniqueForModernization;