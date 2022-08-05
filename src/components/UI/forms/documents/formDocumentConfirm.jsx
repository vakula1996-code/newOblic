import React, {useContext, useState} from 'react';
import {Context} from "../../../../index";
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import InputMui from "../../input/inputMui";
import {observer} from "mobx-react-lite";
import MyButton from "../../button/MyButton";
import DateNow from "../../calendar/dateNow";

const FormDocumentConfirm = observer(() => {
    const {document} = useContext(Context)

    const data = {
        documentNameId: null,
        documentNumber: null,
        documentDate: DateNow()
    }
    const [doc, setDoc] = useState(data)
    const addDocument= ()=>{
        document.setDocumentConfirm([...document.documentConfirm, doc])
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
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Select label='Назва документа' nameSelect="typeDocumentCharity" value={doc.documentNameId} name='documentName'
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


                </tr>

                </tbody>
            </table>
            <MyButton onClick={addDocument}>Додати документ</MyButton>

        </div>

    );

});

export default FormDocumentConfirm;