import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import MyButtonChoice from "../../button/MyButtonChoice";
import classes from '../table.module.css'
import {documentCancel, downloadDOC, downloadPDF} from "../../../../http/Documents";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TableLookDocumentExecution = observer(({documentsList, setDocumentsList,setModalDocument}) => {
    const {documents} = useContext(Context)
    const onChange = (id) => {
        setDocumentsList(documents.documentExecutionList.filter(item => item.id === id))
        setModalDocument(false)
    }
    const onClickDownloadPDF = (documentId,fromSubdivisionId) => {
        downloadPDF(fromSubdivisionId, documentId)
    }

    const onClickDownloadDOC = (documentId,fromSubdivisionId) => {
        downloadDOC(fromSubdivisionId, documentId)
    }
    return (
        <div className={classes.tableScroll}>
            <table>
                <thead>
                <tr>
                    <th>Назва документа</th>
                    <th>Дата документа</th>
                    <th>Майно</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {documents.documentExecutionList.map(({id,fromSubdivisionId, documentName, date, techniques,doc,scan}) =>
                    <tr key={id}>
                        <td>{documentName}</td>
                        <td>{date}</td>
                        <td>
                            <table className={classes.tableSecond}>
                                <thead>
                                <tr>
                                    <th>Назва техніки</th>
                                    <th>Тип техніки</th>
                                    <th style={{zIndex: 9}}>
                                        Детальна інформація
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {techniques.map(({techniqueId, techniqueName, techniqueType, details}) =>
                                    <tr key={techniqueId}>
                                        <td>{techniqueName}</td>
                                        <td>{techniqueType}</td>
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
                                                            <th>Серійний номер</th>
                                                            <th>Ціна за одиницю</th>
                                                            <th>Категорія</th>
                                                            <th>Кількість</th>
                                                            <th>Дата створення</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {details.map(({serialNumber,price,category,count,dateOfManufacture})=>
                                                            <tr>
                                                                <td>{serialNumber}</td>
                                                                <td>{price}</td>
                                                                <td>{category}</td>
                                                                <td>{count}</td>
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
                        </td>
                        <td>
                            {doc === true
                                ?
                                <a
                                    onClick={() => onClickDownloadPDF(id)}
                                    download
                                    className={classes.file}><span>Скачати</span><span>PDF</span></a>
                                :<></>
                            }
                            {scan === true
                                ?
                                <a
                                    onClick={() => onClickDownloadDOC(id,fromSubdivisionId)}
                                    download
                                    className={classes.file}><span
                                    style={{background: "blue"}}>Скачати</span><span
                                    style={{background: "blue"}}>WORD</span></a>
                                :<></>
                            }
                        </td>
                        <td>
                            <MyButtonChoice onClick={() => onChange(id,fromSubdivisionId)}>Вибрати</MyButtonChoice>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
});

export default TableLookDocumentExecution;