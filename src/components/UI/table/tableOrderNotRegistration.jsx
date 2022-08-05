import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import classes from './table.module.css'
import MyButtonChoice from "../button/MyButtonChoice";

const TableOrderNotRegistration = observer(({setVisible,setOrderNotRegisterId}) => {
    const {document} = useContext(Context)
    const [listDocument, setListDocument] = useState([])

    useEffect(()=>{
        setListDocument(document.listOrderNotRegister)
    },[document.listOrderNotRegister])
    const handleChoice = (index)=>{
        const list = [...document.listOrderNotRegister]
        const dataRemove = list.splice(index,1)
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
                        <td>{index+1}</td>
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
                                        <td>{indexTechnique+1}</td>
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
                        <td><MyButtonChoice onClick={()=>handleChoice(index)}>Вибрати</MyButtonChoice></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});

export default TableOrderNotRegistration;