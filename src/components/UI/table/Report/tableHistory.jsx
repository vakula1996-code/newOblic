import React, {useEffect, useState} from 'react';
import {documentHisory} from "../../../../http/Documents";
import classes from '../table.module.css'

const TableHistory = ({params}) => {
    const [historyDocument, setHistoryDocument] = useState([])
    useEffect(() => {
        documentHisory(params.subdivisionId, params.id, params.categoryId).then(data => setHistoryDocument(data))
    }, [])
    return (
        <div>
            <h2>Історія документів</h2>

            <table className={classes.table}>
                <thead>
                <th>З якого підрозділу</th>
                <th>В який</th>
                <th>Дата</th>
                <th>Статус</th>
                <th></th>
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
                                </tr>
                                </thead>
                                <tbody>
                                {documents ?
                                    documents.map(({numberDocument, nameDocument}, index) =>
                                        <tr key={index}>
                                            <td>{numberDocument}</td>
                                            <td>{nameDocument}</td>
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
    );
};

export default TableHistory;