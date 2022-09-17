import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import classes from './table.module.css'
import MyButtonChoice from "../button/MyButtonChoice";

const TableOrderNotRegistration = observer(({setVisible, setOrderNotRegisterId}) => {
    const {documents} = useContext(Context)
    const [listDocument, setListDocument] = useState([])

    useEffect(() => {
        setListDocument(documents.listOrderNotRegister)
    }, [documents.listOrderNotRegister])
    const handleChoice = (index) => {
        const list = [...documents.listOrderNotRegister]
        const dataRemove = list.splice(index, 1)
        setOrderNotRegisterId(dataRemove)
        setVisible(false)
    }
    return (
        <div>
            <h2>Список не зареєстрованих нарядів</h2>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>
                        Назва документа
                    </th>
                    <th>
                        Відправник
                    </th>
                    <th>
                        Одержувач
                    </th>
                    <th>
                        Дата документа
                    </th>
                    <th>
                        Список майна
                    </th>
                    <th>Вибрати</th>
                </tr>
                </thead>
                <tbody>
                {listDocument.map(({
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
                                    <th>Найменування</th>
                                    <th>Тип майна</th>
                                    <th>Серійний номер</th>
                                    <th>Ціна за одиницю</th>
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
                        <td><MyButtonChoice onClick={() => handleChoice(index)}>Вибрати</MyButtonChoice></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});

export default TableOrderNotRegistration;