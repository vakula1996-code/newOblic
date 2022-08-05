import React, {useContext, useEffect, useState} from 'react';
import Select from "../../input/select";
import {Link} from "react-router-dom";
import {Context} from "../../../../index";
import {nameSubdivisions} from "../../../../http/Type";
import {lookTechnique} from "../../../../http/Technique";
import {observer} from "mobx-react-lite";
import classes from "../table.module.css"

const TableReportForSubdivsion = observer(() => {
    const {document} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
    }, [])
    const [subdivisionId, setSubdivisionid] = useState()
    const [listTechnique, setListTechnique] = useState([])
    useEffect(() => {
        if (subdivisionId) {
            lookTechnique(subdivisionId).then(data => setListTechnique(data))
        }
    }, [subdivisionId])
    return (
        <div>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={subdivisionId}
                    name='subdivisionName'
                    getData={e => setSubdivisionid(e.target.value)}/>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Тип техніки</th>
                    <th>Назва техніки</th>
                    <th>Підрозділ</th>
                    <th>Одиниці виміру</th>
                    <th>Кількість</th>
                    <th>Деталі</th>
                </tr>
                </thead>
                <tbody>
                {listTechnique.map(({
                                        id,
                                        typeTechnique,
                                        nameTechniques,
                                        subdivision,
                                        measurement,
                                        count,
                                        techniqueDetails
                                    }, index) =>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{typeTechnique}</td>
                        <td>{nameTechniques}</td>
                        <td>{subdivision}</td>
                        <td>{measurement}</td>
                        <td>{count}</td>
                        <td>
                            <table className={classes.table}>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Серійний номер</th>
                                    <th>Ціна</th>
                                    <th>Дата створення</th>
                                </tr>
                                </thead>
                                <tbody>
                                {techniqueDetails.map(({id, serialNumber, price, dateOfManufacture}, index) =>
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td><Link
                                            to={`/detailLookTechnique/${subdivisionId}/${id}`}>{serialNumber}</Link>
                                        </td>
                                        <td>{price}</td>
                                        <td>{dateOfManufacture}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});

export default TableReportForSubdivsion;