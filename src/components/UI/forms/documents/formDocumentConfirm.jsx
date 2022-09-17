import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import InputMui from "../../input/inputMui";
import {observer} from "mobx-react-lite";
import MyButton from "../../button/MyButton";
import DateNow from "../../calendar/dateNow";
import MyButtonRemove from "../../button/MyButtonRemove";
import {v4 as uuidv4} from 'uuid';
import InputFile from "../../input/inputFile";


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
    console.log(doc)
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
        documents.setFiles(doc.map(docItem => docItem.file))
    }, [doc])


    const onDelete = (id) => () => {
        setDoc((docLocal) => docLocal.filter(docItem => docItem.rowId !== id))

    }


    return (
        <div>
            <h2>Документ</h2>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Назва документа</th>
                    <th>Дата документа</th>
                    <th>Номер документа</th>
                    <th>Прикрепити документ</th>
                    <th><MyButton onClick={addDocument}>+</MyButton></th>

                </tr>
                </thead>
                <tbody>
                {doc.map(({documentNameId, documentDate, documentNumber, documentScanName, rowId, file}) => (
                    <tr key={rowId}>
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

                                <MyButtonRemove onClick={onDelete(rowId)}>
                                    Видалити
                                </MyButtonRemove>
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