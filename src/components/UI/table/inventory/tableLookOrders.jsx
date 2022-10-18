import React from 'react';
import classes from '../table.module.css'
import {downloadDOC, downloadPDF} from "../../../../http/Documents";

const TableLookOrders = ({dataList=[]}) => {
    const onClickDownloadPDF = (documentId,fromSubdivisionId) => {
        downloadPDF(fromSubdivisionId, documentId)
    }

    const onClickDownloadDOC = (documentId,fromSubdivisionId) => {
        downloadDOC(fromSubdivisionId, documentId)
    }
    return (
        dataList.length > 0
        ?
        <div className={classes.tableShow}>
            <h2>Непідтверджені наряди</h2>
            <table>
                <thead>
                    <tr>
                        <th>Назва документа</th>
                        <th>Реєстраційний  номер</th>
                        <th>Відправник</th>
                        <th>Одержувач</th>
                        <th>Документ</th>
                    </tr>
                </thead>
                <tbody>
                {dataList.map(({documentId,fromSubdivisions,fromSubdivisionId,toSubdivisions,nameDocument,numberDocument,scan,doc})=>
                    <tr key={documentId}>
                        <td>{nameDocument}</td>
                        <td>{numberDocument}</td>
                        <td>{fromSubdivisions}</td>
                        <td>{toSubdivisions}</td>
                        {scan === true
                            ?
                            <a
                                onClick={() => onClickDownloadPDF(documentId,fromSubdivisionId)}
                                download
                                className={classes.file}><span>Скачати</span><span>PDF</span></a>
                            :<></>
                        }
                        {doc === true
                            ?
                            <a
                                onClick={() => onClickDownloadDOC(documentId,fromSubdivisionId)}
                                download
                                className={classes.file}><span
                                style={{background: "blue"}}>Скачати</span><span
                                style={{background: "blue"}}>WORD</span></a>
                            :<></>
                        }
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
            :<></>
    );
};

export default TableLookOrders;