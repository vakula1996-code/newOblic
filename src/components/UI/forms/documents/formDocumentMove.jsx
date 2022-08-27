import React, {useEffect, useState} from 'react';
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import Box from "@mui/material/Box";
import DateNow from "../../calendar/dateNow";

const FormDocumentMove = ({id, f, error}) => {
    const data = {
        documentNameId: null,
        toSubdivisionId: null,
        fromSubdivisionId: null,
        documentDate: DateNow()
    }
    const [document, setDocument] = useState(data)
    useEffect(() => {
        id(document.fromSubdivisionId)
    }, [document.fromSubdivisionId])
    useEffect(() => {
        f(document)
    }, [document])
    useEffect(() => {
        if (error === 'Hello world') {
            setDocument(data)
        }
    }, [error])
    return (
        <div>
            <Box>

                <h2>Документ</h2>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>Назва документа</th>
                        <th>Дата документа</th>
                        <th>Частина з якої</th>
                        <th>Частина в яку</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Select label='Назва документа' nameSelect="typeDocumentCharity"
                                    value={document.documentNameId} name='documentName'
                                    getData={(data) => setDocument({...document, documentNameId: data.target.value})}/>
                        </td>
                        <td>
                            <InputDate value={document.documentDate}
                                       getData={(data) => setDocument({...document, documentDate: data.target.value})}/>

                        </td>
                        <td>
                            <Select label="Частина з якої" nameSelect="numberSubdivisions"
                                    value={document.fromSubdivisionId} name='subdivisionName'
                                    getData={(data) => setDocument({
                                        ...document,
                                        fromSubdivisionId: data.target.value
                                    })}/>

                        </td>
                        <td>
                            <Select label="Частина в яку" nameSelect="numberSubdivisions"
                                    value={document.toSubdivisionId} name='subdivisionName'
                                    getData={(data) => setDocument({...document, toSubdivisionId: data.target.value})}/>
                        </td>


                    </tr>

                    </tbody>
                </table>
            </Box>
        </div>
    );
};

export default FormDocumentMove;