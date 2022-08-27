import React from 'react';
import {observer} from "mobx-react-lite";
import classes from "../table.module.css";

const TableLookMove = observer(({list}) => {

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
                    {list.map(({
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

                            </td>
                            <td>{techniqueDetails.serialNumber}</td>
                            <td>{techniqueDetails.price}</td>
                            <td>{techniqueDetails.category}</td>
                            <td>{techniqueDetails.dateOfManufacture}</td>

                        </tr>
                    )}
                    </tbody>
                </table>

                {list.length
                    ? <></>
                    : <h2>Добавте техніку для передачі</h2>
                }
            </div>

        </div>)
        ;
});

export default TableLookMove;