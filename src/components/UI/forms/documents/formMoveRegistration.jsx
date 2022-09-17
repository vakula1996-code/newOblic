import React, {useContext} from 'react';
import classes from "../../../../pages/coming/coming.module.css";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";

import {observer} from "mobx-react-lite";
import InputMui from "../../input/inputMui";
import {Context} from "../../../../index";


const FormMoveRegistration = observer(({setDoc, setId, doc, id}) => {
    const {documents} = useContext(Context)

    return (
        <div>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Дата документа</th>
                    <th>Відправник</th>
                    <th>Одержувач</th>
                    <th>Номер документа</th>
                </tr>
                </thead>
                <tbody>
                <tr>

                    <td>
                        <InputDate value={documents.date}
                                   getData={(data) => setDoc({...doc, date: data.target.value})}/>

                    </td>
                    <td>
                        <Select label="Частина з якої" nameSelect="numberSubdivisions" value={id} name='subdivisionName'
                                getData={e => setId(e.target.value)}/>
                    </td>
                    <td>
                        <Select label="Частина в яку" nameSelect="numberSubdivisions" value={doc.toSubdivisionId}
                                name='subdivisionName'
                                getData={(data) => setDoc({...doc, toSubdivisionId: data.target.value})}/>
                    </td>

                    <td>
                        <InputMui label="Номер документа" value={doc.documentNumber}
                                  getData={(data) => setDoc({...doc, documentNumber: data.target.value})}/>

                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
});

export default FormMoveRegistration;