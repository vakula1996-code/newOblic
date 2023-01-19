import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import classes from "../../table/table.module.css";
import Select from "../../select/select";
import InputDate from "../../input/inputDate";
import InputMui from "../../input/inputMui";
import {observer} from "mobx-react-lite";
import DateNow from "../../calendar/dateNow";
import {v4 as uuidv4} from 'uuid';
import InputFile from "../../input/inputFile";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";


const getEmptyData = (fileName) => ({
    documentNameId: '',
    documentNumber: '',
    documentDate: DateNow(),
    documentScanName: fileName,
    file: null,
    rowId: uuidv4()
})

const FormDocumentConfirm = observer(() => {
    const {documents} = useContext(Context)

    const [doc, setDoc] = useState([getEmptyData('file1')])
    const addDocument = () => {
        setDoc([...doc, getEmptyData(`file${doc.length + 1}`)])
    }

    const onAddFile = (id) => (e) => {
        const file = e.target.files[0];
        setDoc((docLocal) => docLocal.map(docItem => docItem.rowId === id ? ({...docItem, file}) : docItem))
    }
    const onChangeTextInput = (id, fieldName) => (e) => {
        setDoc((docLocalList) => {
            return docLocalList.map(docItem => {
                if (docItem.rowId === id) {
                    return {...docItem, [fieldName]: e.target.value}
                }
                return docItem
            })
        })
    }


    useEffect(() => {
        documents.setDocumentConfirm(doc)
    }, [doc])


    const onDelete = (id) => () => {
        setDoc((docLocal) => docLocal.filter(docItem => docItem.rowId !== id))

    }


    return (
        <div className={classes.tableScroll} style={{maxHeight: 'calc(100vh - 800px)'}}>
            <h2>Супроводжуючі документи</h2>
            <table width={'100%'}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Назва документа</th>
                    <th>Дата документа</th>
                    <th>Номер документа</th>
                    <th>Прикріпити документ</th>
                    <th><IconButton size='small'
                                    onClick={addDocument}>
                        <AddBoxIcon></AddBoxIcon></IconButton>
                    </th>
                </tr>
                </thead>
                <tbody>
                {doc.map(({documentNameId, documentDate, documentNumber, documentScanName, rowId, file}, index) => (
                    <tr key={rowId}>
                        <td>{index + 1}</td>
                        <td>
                            <Select
                                label='Назва документа'
                                nameSelect="typeDocumentCharity"
                                value={documentNameId}
                                name='documentName'
                                selectName='documentNameId'
                                getData={onChangeTextInput(rowId, 'documentNameId')}/>
                        </td>
                        <td>
                            <InputDate
                                value={documentDate}
                                name='documentDate'
                                getData={onChangeTextInput(rowId, 'documentDate')}/>
                        </td>
                        <td>
                            <InputMui
                                label="Номер документа"
                                value={documentNumber}
                                name='documentNumber'
                                getData={onChangeTextInput(rowId, 'documentNumber')}/>
                        </td>
                        <td>
                            <InputFile
                                name={documentScanName}
                                onChange={onAddFile(rowId)}
                                value={file}
                            />
                        </td>
                        {doc.length > 1
                            ?
                            <td>

                                <IconButton size='small'
                                            onClick={onDelete(rowId)}><DeleteIcon></DeleteIcon></IconButton>
                            </td>
                            : <td></td>
                        }
                    </tr>
                ))}

                </tbody>
            </table>

        </div>

    );

});

export default FormDocumentConfirm;