import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {executionOrder} from "../../../../http/Documents";
import {toJS} from "mobx";
import InputDate from "../../input/inputDate";
import MyButton from "../../button/MyButton";
import classes from "../table.module.css"
import DateNow from "../../calendar/dateNow";
import ErrorAddData from "../../error/errorAddData";
import InputFile from "../../input/inputFile";

const TableMoveExecution = observer(() => {
    const {documents} = useContext(Context)
    const [dateConfirm, setDateConfirm] = useState(DateNow())
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const [file, setFile] = useState(null)
    const documentConfim = () => {
        executionOrder(
            {
                orderId: toJS(documents.listOrderNotExecution['id']),
                date: dateConfirm,
                orderScanName: "file",
                documents: toJS(documents.documentConfirm)
            },
            file,
            documents.Myfiles
        )
            .catch(data => {
                if (data.response.data.detail) {
                    setError(data.response.data.detail)
                    setErrorMessages(data.response.data.detail)
                } else if (data.response.status === 500) {
                    setError('Не опрацьовий запит')
                    setErrorMessages('Не опрацьовий запит! Перевірте правельність ведених значень.')
                }
            }).then(data => {
            if (data !== undefined) {
                setError(data)
                setErrorMessages(data)
            }
        })
    }
    return (
        toJS(documents.listOrderNotExecution).length !== 0
            ?
            <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
                <h2>Список не підтвердженої передачі</h2>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>
                            Назва документа
                        </th>
                        <th>
                            Відправник
                        </th>
                        <th>
                            Одержувач
                        </th>
                        <th>
                            Дата документа
                        </th>
                        <th>
                            Список майна
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {[documents.listOrderNotExecution].map(({
                                                                documentName,
                                                                fromSubdivision,
                                                                toSubdivision,
                                                                date,
                                                                techniques
                                                            }, index) =>
                        <tr key={index}>
                            <td>{documentName}</td>
                            <td>{fromSubdivision}</td>
                            <td>{toSubdivision}</td>
                            <td>{date}</td>
                            <td>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Найменування</th>
                                        <th>Тип майна</th>
                                        <th>Серійний номер</th>
                                        <th>Ціна за одиницю</th>
                                        <th>Дата створення</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {techniques
                                        ?
                                        techniques.map(({
                                                            techniqueName,
                                                            techniqueType,
                                                            techniqueDetail
                                                        }, indexTechnique) =>
                                            <tr key={indexTechnique}>
                                                <td>{techniqueName}</td>
                                                <td>{techniqueType}</td>
                                                <td>{techniqueDetail.serialNumber}</td>
                                                <td>{techniqueDetail.price}</td>
                                                <td>{techniqueDetail.dateOfManufacture}</td>
                                            </tr>
                                        )

                                        : <></>
                                    }

                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <div style={{textAlignLast: 'right'}}>
                    <h3>Дата підтвердження</h3>
                    <InputDate
                        value={dateConfirm}
                        getData={(e) => setDateConfirm(e.target.value)}
                        style={{marginTop: '-25px'}}
                    />
                    <div style={{marginLeft: '80%', marginBottom: 10}}>
                        <InputFile onChange={(e) => setFile(e.target.files[0])} value={file}/>
                    </div>
                </div>
                <MyButton onClick={documentConfim}>Підтвердити передачу</MyButton>

            </ErrorAddData>
            : <></>
    );
});

export default TableMoveExecution;