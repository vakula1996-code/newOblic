import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import classes from './table.module.css'
import MyButtonRemove from "../button/MyButtonRemove";

const TableDocumentConfirm = observer(() => {
    const {documents} = useContext(Context)
    const handleRemoveDocument = (index) => {
        const list = [...documents.documentConfirm]
        list.splice(index, 1)
        documents.setDocumentConfirm(list)
    }
    return (
        documents.documentConfirm.length > 0
            ?
            <div>
                <h2>Список доданих документів</h2>

                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Назва документа</th>
                        <th>Дата документа</th>
                        <th>Номер документа</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {documents.documentConfirm.map(({
                                                        documentNameId,
                                                        documentNumber,
                                                        documentDate
                                                    }, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{documentNameId}</td>
                            <td>{documentDate}</td>
                            <td>{documentNumber}</td>
                            <td>
                                <MyButtonRemove onClick={() => handleRemoveDocument(index)}>Видалити</MyButtonRemove>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            : <></>
    );
});

export default TableDocumentConfirm;