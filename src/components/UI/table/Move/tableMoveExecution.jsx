import React, {useContext,useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {executionOrder} from "../../../../http/Documents";
import {toJS} from "mobx";
import InputDate from "../../input/inputDate";
import MyButton from "../../button/MyButton";
import classes from "../table.module.css"
import DateNow from "../../calendar/dateNow";

const TableMoveExecution = observer(() => {
    const {document} = useContext(Context)
    const [dateConfirm, setDateConfirm] = useState(DateNow())
    const documentConfim = () => {
        executionOrder({orderId:toJS(document.listOrderNotExecution['id']),date:dateConfirm,documents:toJS(document.documentConfirm)})
    }
    return (
        toJS(document.listOrderNotExecution).length !==0
        ?
        <div>
            <h2>Список не підтвердженої передачі</h2>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>
                        Назва документа
                    </th>
                    <th>
                        Від кого
                    </th>
                    <th>
                        До кого
                    </th>
                    <th>
                        Дата документа
                    </th>
                    <th>
                        Список техніки
                    </th>
                </tr>
                </thead>
                <tbody>
                {[document.listOrderNotExecution].map(({
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
                                    <th>Назва техніки</th>
                                    <th>Тип техніки</th>
                                    <th>Серійний номер</th>
                                    <th>Ціна</th>
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
                        style={{marginTop:'-25px'}}
                    />
            </div>
                <MyButton onClick={documentConfim}>Підтвердити передачу</MyButton>

        </div>
            :<></>
    );
});

export default TableMoveExecution;