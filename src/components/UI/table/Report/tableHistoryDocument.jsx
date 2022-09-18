import React, {useEffect,useState} from 'react';
import {techniqueHistory} from "../../../../http/Technique";
import classes from '../table.module.css'

const TableHistoryDocument = ({params}) => {
    const [history, setHistory] = useState([])
    useEffect(()=>{
        techniqueHistory(params.subdivisionId, params.id, params.categoryId).then(data => setHistory(data))

    },[])
    return (
        <div>
            <h2>Історія руху</h2>

            <table className={classes.table}>
                <thead>
                <th>З якого підрозділу</th>
                <th>В який</th>
                <th>Дата</th>
                <th>Детальна інформація</th>
                </thead>
                <tbody>
                {history.map(({
                                  toSubdivision,
                                  fromSubdivision,
                                  date,
                                  documents
                              }, index) =>
                    <tr key={index}>
                        <td>{fromSubdivision}</td>
                        <td>{toSubdivision}</td>
                        <td>{date}</td>
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

export default TableHistoryDocument;