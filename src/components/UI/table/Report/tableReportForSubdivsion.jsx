import React, {useContext, useEffect, useState} from 'react';
import Select from "../../select/select";
import {Link} from "react-router-dom";
import {Context} from "../../../../index";
import {nameSubdivisions} from "../../../../http/Type";
import {lookTechnique} from "../../../../http/Technique";
import {observer} from "mobx-react-lite";
import classes from "../table.module.css"
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                        <td>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <h4>Детальні данні</h4>
                                </AccordionSummary>
                                <AccordionDetails>
                            <table className={classes.table}>
                                <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Серійний номер</th>
                                    <th>Кількість</th>
                                    <th>Ціна</th>
                                    <th>Дата створення</th>
                                </tr>
                                </thead>
                                <tbody>
                                {techniqueDetails.map(({id, serialNumber, price, dateOfManufacture,category,categoryId,count}, index) =>
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td><Link
                                            to={`/detailLookTechnique/${subdivisionId}/${id}/${categoryId}`}>{serialNumber}</Link>
                                        </td>
                                        <td>{count}</td>
                                        <td>{price}</td>
                                        <td>{dateOfManufacture}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                                </AccordionDetails>
                            </Accordion>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});

export default TableReportForSubdivsion;