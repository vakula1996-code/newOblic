import React,{useContext} from 'react';
import classes from "../table.module.css";
import {observer} from "mobx-react-lite";
import {registerOrder} from "../../../../http/Documents";
import MyButton from "../../button/MyButton";
import {Context} from "../../../../index";

const TableForOrderNotRegister = observer(({orderNotRegisterId, doc}) => {
    const {document} = useContext(Context)
    const register = () => {
        if (document.listOrderNotRegister[0]['id']) {
            registerOrder({documentNumber: doc.documentNumber, orderId: document.listOrderNotRegister[0]['id']})
        }
    }
    return (
        orderNotRegisterId.length > 0
            ?
            <div>

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
                        </tr>
                    )}
                    </tbody>
                </table>
                <MyButton onClick={register}>Зареєструвати наряд</MyButton>

            </div>

            : <h2>Добавте не зареєстрований наряд</h2>
    );
});

export default TableForOrderNotRegister;