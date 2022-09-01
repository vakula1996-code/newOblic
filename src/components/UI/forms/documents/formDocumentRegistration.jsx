import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {orderNotExecution} from "../../../../http/Documents";
import classes from "../../../../pages/coming/coming.module.css";
import InputDate from "../../input/inputDate";
import Select from "../../input/select";
import InputMui from "../../input/inputMui";
import {Context} from "../../../../index";
import MyButton from "../../button/MyButton";

const FormDocumentRegistration = observer(({setVisible}) => {
    const {document} = useContext(Context)

    const data = {
        orderNumber: null,
        date: null
    }
    const [doc, setDoc] = useState(data)
    const [id, setId] = useState('')

    const addDocument = () => {
        orderNotExecution(doc, id).then(data => document.setListOrderNotExecution(data))
        setVisible(false)
    }

    return (
        <div>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Дата документа</th>
                    <th>Номер документа</th>
                    <th>Відправник</th>
                </tr>
                </thead>
                <tbody>
                <tr>

                    <td>
                        <InputDate value={document.date}
                                   getData={(data) => setDoc({...doc, date: data.target.value})}/>

                    </td>
                    <td>
                        <InputMui label="Номер документа" value={doc.orderNumber}
                                  getData={(data) => setDoc({...doc, orderNumber: data.target.value})}/>

                    </td>
                    <td>
                        <Select label="Частина з якої" nameSelect="numberSubdivisions" value={id} name='subdivisionName'
                                getData={e => setId(e.target.value)}/>
                    </td>
                </tr>

                </tbody>
            </table>
            <MyButton onClick={addDocument}>Отримати документ</MyButton>
        </div>
    );
});

export default FormDocumentRegistration;