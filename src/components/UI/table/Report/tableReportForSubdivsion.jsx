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
    const {documents} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    const [subdivisionId, setSubdivisionId] = useState()
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
                    getData={e => setSubdivisionId(e.target.value)}/>
            {listTechnique.length > 0
                ?
                <table className={classes.table}>

                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Тип</th>
                        <th>Найменування</th>
                        <th>Підрозділ</th>
                        <th>Одиниця виміру</th>
                        <th>Додаткові дані</th>
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
                            <td>{index + 1}</td>
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
                                        <h4>Додаткові дані</h4>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <table className={classes.table}>
                                            <thead>
                                            <tr>
                                                <th>№</th>
                                                <th>Серійний номер</th>
                                                <th>Кількість</th>
                                                <th>Ціна за одиницю</th>
                                                <th>Дата створення</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {techniqueDetails.map(({
                                                                       id,
                                                                       serialNumber,
                                                                       price,
                                                                       dateOfManufacture,
                                                                       category,
                                                                       categoryId,
                                                                       count
                                                                   }, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
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
                : <></>
            }
        </div>
    );
});

export default TableReportForSubdivsion;