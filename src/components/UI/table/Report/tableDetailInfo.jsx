import React, {useEffect, useState} from 'react';
import {techniqueInformation} from "../../../../http/Technique";
import classes from '../table.module.css'

const TableDetailInfo = ({params}) => {
    const [info, setInfo] = useState([])
    useEffect(() => {
        techniqueInformation(params.subdivisionId, params.id, params.categoryId).then(data => setInfo([data]))
    }, [])
    return (
        <div>
            <h2>Детальна інформація</h2>

            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Підрозділ</th>
                    <th>Тип</th>
                    <th>Тип забезпечення</th>
                    <th>Найменування</th>
                    <th>Серійний номер</th>
                    <th>Кількість</th>
                    <th>Одиниця виміру</th>
                    <th>Ціна за одиницю</th>
                    <th>Категорія</th>
                </tr>
                </thead>
                <tbody>
                {
                    info.map(({
                                  subdivision,
                                  typeTechnique,
                                  ensuringType,
                                  nameTechnique,
                                  serialNumber,
                                  count,
                                  measurement,
                                  price,
                                  category
                              }, index) =>
                        <tr key={index}>
                            <td>{subdivision}</td>
                            <td>{typeTechnique}</td>
                            <td>{ensuringType}</td>
                            <td>{nameTechnique}</td>
                            <td>{serialNumber}</td>
                            <td>{count}</td>
                            <td>{measurement}</td>
                            <td>{price}</td>
                            <td>{category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableDetailInfo;