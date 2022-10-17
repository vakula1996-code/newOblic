import React, {useEffect, useState} from 'react';
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../select/select";
import Box from "@mui/material/Box";
import InputDate from "../../input/inputDate";
import DateNow from "../../calendar/dateNow";

const FormDocumentMove = ({id, f, error}) => {
    const data = {
        toSubdivisionId: null,
        fromSubdivisionId: null,
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
                        {/*<th>Назва документа</th>*/}
                        <th>Відправник</th>
                        <th>Одержувач</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
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