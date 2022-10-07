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
            <table className={classes.table}>
                <thead>
                <th>З якого підрозділу</th>
                <th>В який</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Детальна інформація</th>
                </thead>
                <tbody>
                {historyDocument.map(({

                                          toSubdivision,
                                          fromSubdivision,
                                          date,
                                          status,
                                          documents
                                      }, index) =>
                    <tr key={index}>
                        <td>{fromSubdivision}</td>
                        <td>{toSubdivision}</td>
                        <td>{date}</td>
                        <td><input type="checkbox" checked={status}/></td>
                        <td>
                            <table>
                                <thead>
                                <tr>
                                    <th>Номер документа</th>
                                    <th>Назва документа</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {documents ?
                                    documents.map(({documentId, numberDocument, nameDocument}, index) =>
                                        <tr key={index}>
                                            <td>{numberDocument}</td>
                                            <td>{nameDocument}</td>
                                            <td>
                                                <a
                                                    onClick={() => onClickDownloadPDF(documentId)}
                                                    download
                                                    className={classes.file}><span>Скачати</span><span>PDF</span></a>
                                                <a
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
        </ErrorAddData>
    );
};

export default TableHistory;