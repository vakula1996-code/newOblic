import React, {useContext} from 'react';
import classes from "../table.module.css";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import MyButtonRemove from "../../button/MyButtonRemove";

const TableForOrderNotRegister = observer(({orderNotRegisterId, doc, setOrderNotRegisterId}) => {
    const {document} = useContext(Context)
    const onDelete = () => {
        setOrderNotRegisterId([])
    }
    return (
        orderNotRegisterId.length > 0
            ?
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>
                        Назва документа
                    </th>
                    <th>
                        Від кого
                    </th>
                    <th>
                        До кого
                    </th>
                    <th>
                        Дата документа
                    </th>
                    <th>
                        Список техніки
                    </th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orderNotRegisterId.map(({
                                             documentName,
                                             fromSubdivision,
                                             toSubdivision,
                                             date,
                                             techniques
                                         }, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{documentName}</td>
                        <td>{fromSubdivision}</td>
                        <td>{toSubdivision}</td>
                        <td>{date}</td>
                        <td>
                            <table className={classes.table}>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Назва техніки</th>
                                    <th>Тип техніки</th>
                                    <th>Серійний номер</th>
                                    <th>Ціна</th>
                                    <th>Дата створення</th>
                                </tr>
                                </thead>
                                <tbody>
                                {techniques.map(({techniqueName, techniqueType, techniqueDetail}, indexTechnique) =>
                                    <tr key={indexTechnique}>
                                        <td>{indexTechnique + 1}</td>
                                        <td>{techniqueName}</td>
                                        <td>{techniqueType}</td>
                                        <td>{techniqueDetail.serialNumber}</td>
                                        <td>{techniqueDetail.price}</td>
                                        <td>{techniqueDetail.dateOfManufacture}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </td>
                        <td>
                            <MyButtonRemove onClick={onDelete}>
                                Видалити
                            </MyButtonRemove></td>
                    </tr>
                )}
                </tbody>
            </table>


            : <h2>Добавте не зареєстрований наряд</h2>
    );
});

export default TableForOrderNotRegister;