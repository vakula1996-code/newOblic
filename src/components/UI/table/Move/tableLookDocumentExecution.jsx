import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import MyButtonChoice from "../../button/MyButtonChoice";
import classes from '../table.module.css'
import {documentCancel} from "../../../../http/Documents";

const TableLookDocumentExecution = observer(() => {
    const {documents} = useContext(Context)
    const [documentsList, setDocumentsList] = useState([])
    const [stateButton, setStateButton] = useState(false)
    useEffect(() => {
        setDocumentsList(documents.documentExecutionList)
        setStateButton(false)
    }, [documents.documentExecutionList])
    const onChange = (id) => {
        setDocumentsList(documentsList.filter(item => item.id === id))
        setStateButton(true)
    }
    const onDocumentExecution = () => {
        documentCancel({orderId:documentsList[0].id,date:documentsList[0].date})
    }
    return (
        <div>
            <table className={classes.tableShow}>
                <thead>
                <tr>
                    <th>Назва документа</th>
                    <th>Дата документа</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {documentsList.map(({id, documentName, date}) =>
                    <tr key={id}>
                        <td>{documentName}</td>
                        <td>{date}</td>
                        <td>
                            <MyButtonChoice onClick={() => onChange(id)}>Вибрати</MyButtonChoice>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {stateButton === true
                ? <MyButtonChoice onClick={onDocumentExecution}>Вилучити наряд</MyButtonChoice>
                : <></>
            }
        </div>
    );
});

export default TableLookDocumentExecution;