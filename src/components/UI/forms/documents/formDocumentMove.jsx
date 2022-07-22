import React,{useState} from 'react';
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import Box from "@mui/material/Box";

const FormDocumentMove = () => {
    const data = {
        documentNameId: "",
        toSubdivisionId: "",
        fromSubdivisionId: "",
        documentDate: ""
    }
    const [document, setDocument] = useState(data)

    return (
        <div>
            <Box className={classes.containerForm}>

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
                            <Select label='Назва документа' nameSelect="typeDocumentCharity" value={document.documentNameId} name='documentName'
                                    getData={(data) => setDocument({...document, documentNameId: data.target.value})}/>

                        </td>
                        <td>
                            <InputDate value={document.documentDate}
                                       getData={(data) => setDocument({...document, documentDate: data.target.value})}/>

                        </td>
                        <td>
                            <Select label="Частина з якої" nameSelect="numberSubdivisions" value={document.toSubdivisionId}
                                    getData={(data) => setDocument({...document, toSubdivisionId: data.target.value})}/>

                        </td>
                        <td>
                            <Select label="Частина в яку" nameSelect="numberSubdivisions" value={document.toSubdivisionId} name='subdivisionName'
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