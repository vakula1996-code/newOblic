import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import InputMui from "../../input/inputMui";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import DateNow from "../../calendar/dateNow";
import MyButton from "../../button/MyButton";
import MyButtonRemove from "../../button/MyButtonRemove";
import InputFile from "../../input/inputFile";
import {v4 as uuidv4} from "uuid";


const getEmptyData = (fileName) => ({
    documentNameId: '',
    toSubdivisionId: '',
    fromSubdivisionId: '',
    documentNumber: '',
    documentDate: DateNow(),
    documentScanName: fileName,
    file: null,
    rowId: uuidv4()
})

const FormDocumentOutfit = observer(({error}) => {
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

    const onDelete = (id) => () => {
        setDoc((docLocal) => docLocal.filter(docItem => docItem.rowId !== id))

    }

    useEffect(() =>
            documents.setDocument(doc)
        , [doc])
    useEffect(() => {
        if (error === 'Hello world') {
            setDoc([getEmptyData('file1')])
        }
    }, [error])
    return (
        <Box>
            <h2>Документ</h2>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Дата</th>
                    <th>Реєстраційний номер</th>
                    <th>Відправник</th>
                    <th>Одержувач</th>
                    <th>Прикрепити документ</th>
                    <th><MyButton onClick={addDocument}>+</MyButton></th>

                </tr>
                </thead>
                <tbody>
                {doc.map(({
                              documentNameId,
                              fromSubdivisionId,
                              toSubdivisionId,
                              documentNumber,
                              documentDate,
                              rowId,
                              documentScanName,
                              file
                          }, index) => (
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
                            <Select
                                label="Частина з якої"
                                nameSelect="numberSubdivisions"
                                value={fromSubdivisionId}
                                name='subdivisionName'
                                selectName='fromSubdivisionId'
                                getData={onChangeTextInput(rowId, 'fromSubdivisionId')}/>
                        </td>
                        <td>
                            <Select
                                label="Частина в яку"
                                nameSelect="numberSubdivisions"
                                value={toSubdivisionId}
                                name='subdivisionName'
                                selectName='toSubdivisionId'
                                getData={onChangeTextInput(rowId, 'toSubdivisionId')}/>
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
        </Box>
    );

});

export default FormDocumentOutfit;