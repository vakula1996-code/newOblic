import React from 'react';
import classes from '../table.module.css'
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {downloadDOC, downloadPDF} from "../../../../http/Documents";

const TableDocumentsAll = ({dataList}) => {
    const onClickDownloadPDF = (documentId, fromSubdivisionId) => {
        downloadPDF(fromSubdivisionId, documentId)
    }

    const onClickDownloadDOC = (documentId, fromSubdivisionId) => {
        downloadDOC(fromSubdivisionId, documentId)
    }
    return (
        dataList.length > 0
            ?
            <div className={classes.tableScroll}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            №
                        </th>
                        <th>
                            Дата
                        </th>
                        <th>
                            Відправник
                        </th>
                        <th>
                            Одержувач
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataList.map(({date, fromSubdivision, toSubdivision, documents}, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{date}</td>
                            <td>{fromSubdivision}</td>
                            <td>{toSubdivision}</td>
                            <td>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header">
                                        <h4>Документи</h4>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th>Назва документа</th>
                                                <th>Реєстраційний номер</th>
                                                <th>Статус</th>
                                                <th colSpan={2}>Документи</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {documents.map(({
                                                                documentId,
                                                                numberDocument,
                                                                nameDocument,
                                                                status,
                                                                fromSubdivisionId,
                                                                scan,
                                                                doc
                                                            }, index) =>
                                                <tr key={index}>
                                                    <td>{nameDocument}</td>
                                                    <td>{numberDocument}</td>
                                                    <td>{status}</td>
                                                    <td>

                                                        <a
                                                            style={scan === true ? {} : {visibility: 'collapse'}}
                                                            onClick={() => onClickDownloadPDF(documentId, fromSubdivisionId)}
                                                            download
                                                            className={classes.file}><span>Скачати</span><span>PDF</span></a>

                                                    </td>
                                                    <td>
                                                        <a
                                                            style={doc === true ? {} : {visibility: 'collapse'}}
                                                            onClick={() => onClickDownloadDOC(documentId, fromSubdivisionId)}
                                                            download
                                                            className={classes.file}><span
                                                            style={{background: "blue"}}>Скачати</span><span
                                                            style={{background: "blue"}}>WORD</span></a>
                                                    </td>
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
            : <></>

    );
};

export default TableDocumentsAll;