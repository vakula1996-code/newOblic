import React, {useContext, useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import InputMui from "../../input/inputMui";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import DateNow from "../../calendar/dateNow";


const FormDocumentOutfit = observer(({error}) => {
    const {document} = useContext(Context)

    const data = {
        documentNameId: null,
        toSubdivisionId: null,
        fromSubdivisionId: null,
        documentNumber: '',
        documentDate: DateNow()
    }
    const [doc, setDoc] = useState(data)

    useEffect(() =>
            document.setDocument([doc])
        , [doc])
    useEffect(() => {
        if (error === 'Hello world') {
            setDoc(data)
        }
    }, [error])

    return (
        <Box className={classes.containerForm}>

            <h2>Документ</h2>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Дата</th>
                    <th>Реєстраційний номер</th>
                    <th>Відправник</th>
                    <th>Одержувач</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Select label='Назва документа' nameSelect="typeDocumentCharity" value={doc.documentNameId}
                                name='documentName'
                                getData={(data) => setDoc({...doc, documentNameId: data.target.value})}/>

                    </td>
                    <td>
                        <InputDate value={doc.documentDate}
                                   getData={(data) => setDoc({...doc, documentDate: data.target.value})}/>

                    </td>
                    <td>
                        <InputMui label="Номер документа" value={doc.documentNumber}
                                  getData={(data) => setDoc({...doc, documentNumber: data.target.value})}/>

                    </td>
                    <td>
                        <Select label="Частина з якої" nameSelect="numberSubdivisions" value={doc.fromSubdivisionId}
                                name='subdivisionName'
                                getData={(data) => setDoc({...doc, fromSubdivisionId: data.target.value})}/>

                    </td>
                    <td>
                        <Select label="Частина в яку" nameSelect="numberSubdivisions" value={doc.toSubdivisionId}
                                name='subdivisionName'
                                getData={(data) => setDoc({...doc, toSubdivisionId: data.target.value})}/>
                    </td>


                </tr>

                </tbody>
            </table>
        </Box>
    );

});

export default FormDocumentOutfit;