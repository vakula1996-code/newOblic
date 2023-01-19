import React, {useEffect, useState} from 'react';
import {documentHisory, downloadDOC, downloadPDF} from "../../../../http/Documents";
import classes from '../table.module.css'
import ErrorAddData from "../../error/errorAddData";

const TableHistory = ({params}) => {
    const [historyDocument, setHistoryDocument] = useState([])
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const onClickDownloadPDF = (documentId) => {
        const response = downloadPDF(params.subdivisionId, documentId)
    }

    const onClickDownloadDOC = (documentId) => {
        downloadDOC(params.subdivisionId, documentId).then((error) => {
            if (error.response.status === 500) {
                setError(error.message)
                setErrorMessages(error.message)
            }
        })

    }
    useEffect(() => {
        documentHisory(params.subdivisionId, params.id, params.categoryId).then(data => setHistoryDocument(data))
    }, [])
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <h2>Історія документів</h2>
            <div className={classes.tableScroll}>
                <table>
                    <thead>
                    <tr>
                        <th>З якого підрозділу</th>
                        <th>В який</th>
                        <th>Дата</th>
                        <th>Статус</th>
                        <th>Детальна інформація</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historyDocument.map(({

                                              toSubdivision,
                                              fromSubdivision,
                                              date,
                                              status,
                                              documents,

                                          }, index) =>
                        <tr key={index}>
                            <td>{fromSubdivision}</td>
                            <td>{toSubdivision}</td>
                            <td>{date}</td>
                            <td>{status}</td>
                            <td>
                                <table width={'100%'}>
                                    <thead>
                                    <tr>
                                        <th>Номер документа</th>
                                        <th>Назва документа</th>
                                        <th colSpan={2}>Документи</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {documents ?
                                        documents.map(({documentId, numberDocument, nameDocument, scan, doc}, index) =>
                                            <tr key={index}>
                                                <td>{numberDocument}</td>
                                                <td>{nameDocument}</td>
                                                <td>

                                                    <a
                                                        style={scan === true ? {} : {visibility: 'collapse'}}
                                                        onClick={() => onClickDownloadPDF(documentId)}
                                                        download
                                                        className={classes.file}><span>Скачати</span><span>PDF</span></a>

                                                </td>
                                                <td>
                                                    <a
                                                        style={doc === true ? {} : {visibility: 'collapse'}}
                                                        onClick={() => onClickDownloadDOC(documentId)}
                                                        download
                                                        className={classes.file}><span
                                                        style={{background: "blue"}}>Скачати</span><span
                                                        style={{background: "blue"}}>WORD</span></a>
                                                </td>
                                            </tr>
                                        )
                                        : <></>
                                    }
                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </ErrorAddData>
    );
};

export default TableHistory;