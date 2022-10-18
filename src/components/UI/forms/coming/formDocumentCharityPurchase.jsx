import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import classes from "../../../../pages/coming/coming.module.css";
import InputDate from "../../input/inputDate";
import InputMui from "../../input/inputMui";
import Select from "../../select/select";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import DateNow from "../../calendar/dateNow";
import {v4 as uuidv4} from "uuid";
import InputFile from "../../input/inputFile";
import hookDataChangeSimple from "../../../hook/hookDataChange/hookDataChangeSimple";


const getEmptyData = (fileName) => ({
    documentNameId: null,
    toSubdivisionId: null,
    documentNumber: '',
    documentDate: DateNow(),
    documentScanName: fileName,
    file: null,
    rowId: uuidv4()
})


const FormDocumentCharityPurchase = observer(({error}) => {
    const {documents} = useContext(Context)

    const [doc, setDoc] = useState([getEmptyData('file1')])

    const addDocument = () => {
        setDoc([...doc, getEmptyData(`file${doc.length + 1}`)])
    }
    const onAddFile = (id) => (e) => {
        const file = e.target.files[0];
        setDoc((docLocal) => docLocal.map(docItem => docItem.rowId === id ? ({...docItem, file}) : docItem))
    }


    const onDelete = (id) => () => {
        setDoc((docLocal) => docLocal.filter(docItem => docItem.rowId !== id))

    }
    useEffect(() => {
            documents.setDocument(doc)
            documents.setFiles(doc.map(list => list.file))
        }, [doc]
    )
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
                    <th>Підрозділ</th>
                    <th>Прикріпити документ</th>
                    {/*<th>*/}
                    {/*    <IconButton*/}
                    {/*        onClick={addDocument}>*/}
                    {/*        <AddBoxIcon style={{margin: 'auto'}}></AddBoxIcon></IconButton>*/}
                    {/*</th>*/}
                </tr>
                </thead>
                <tbody>
                {doc.map(({
                              documentNameId,
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
                                getData={hookDataChangeSimple(
                                    {
                                        data: doc,
                                        setData: setDoc,
                                        nameData: 'documentNameId',
                                        id: rowId,
                                        idName: 'rowId'
                                    })
                                }/>
                        </td>
                        <td>
                            <InputDate
                                value={documentDate}
                                name='documentDate'
                                getData={hookDataChangeSimple(
                                    {
                                        data: doc,
                                        setData: setDoc,
                                        nameData: 'documentDate',
                                        id: rowId,
                                        idName: 'rowId'
                                    })
                                }/>
                        </td>
                        <td>
                            <InputMui
                                label="Номер документа"
                                value={documentNumber}
                                name='documentNumber'
                                getData={hookDataChangeSimple(
                                    {
                                        data: doc,
                                        setData: setDoc,
                                        nameData: 'documentNumber',
                                        id: rowId,
                                        idName: 'rowId'
                                    })
                                }/>
                        </td>
                        <td>
                            <Select
                                label="Підрозділ"
                                nameSelect="numberSubdivisions"
                                value={toSubdivisionId}
                                name='subdivisionName'
                                selectName='toSubdivisionId'
                                getData={hookDataChangeSimple(
                                    {
                                        data: doc,
                                        setData: setDoc,
                                        nameData: 'toSubdivisionId',
                                        id: rowId,
                                        idName: 'rowId'
                                    })
                                }/>
                        </td>
                        <td>
                            <InputFile
                                name={documentScanName}
                                onChange={onAddFile(rowId)}
                                value={file}
                                accept='application/pdf'
                            />
                        </td>
                        {/*{doc.length > 1*/}
                        {/*    ?*/}
                        {/*    <td>*/}
                        {/*        <IconButton size='small'*/}
                        {/*                    onClick={onDelete(rowId)}><DeleteIcon></DeleteIcon></IconButton>*/}
                        {/*    </td>*/}

                        {/*    : <td></td>*/}
                        {/*}*/}
                    </tr>
                ))}
                </tbody>
            </table>
        </Box>
    )
        ;
});

export default FormDocumentCharityPurchase;