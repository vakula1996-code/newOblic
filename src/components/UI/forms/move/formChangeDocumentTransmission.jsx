import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";
import classes from "../../table/table.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {toJS} from "mobx";
import MyInput from "../../input/MyInput";
import SaveIcon from "@mui/icons-material/Save";

const FormChangeDocumentTransmission = observer(({visible, setVisible}) => {
    const {documents} = useContext(Context)
    const [orderNotExecution, setOrderNotExecution] = useState([])
    useEffect(() => {
        setOrderNotExecution([toJS(documents.listOrderNotExecution)])
    }, [visible])
    const deleteTechnique = (id) => {
        setOrderNotExecution([{
            ...orderNotExecution[0],
            techniques: orderNotExecution[0].techniques.filter(item => item.techniqueDetail.techniqueDetailId !== id)
        }])
        documents.setDocumentConfirmChangedTechniques([...documents.documentConfirmChangedTechniques, {
            'techniqueDetailId': orderNotExecution[0].techniques.map(item => item.techniqueDetail.techniqueDetailId === id ? item.techniqueDetail.techniqueDetailId : '')[0],
            'howCategoryId': orderNotExecution[0].techniques.map(item => item.techniqueDetail.techniqueDetailId === id ? item.techniqueDetail.howCategoryId : '')[0],
            'newCount': orderNotExecution[0].techniques.map(item => item.techniqueDetail.techniqueDetailId === id ? item.techniqueDetail.count : '')[0],
            'delete': true
        }])
    }
    const handleCountChange = (e, index, id) => {
        if (e.target.value.length === 0) {
            const list = [...orderNotExecution]
            list[0]['techniques'][index]['techniqueDetail'].count = 0
            setOrderNotExecution(list)
        } else if (documents.listOrderNotExecution['techniques'][index]['techniqueDetail'].count < e.target.value) {
            const list = [...orderNotExecution]
            list[0]['techniques'][index]['techniqueDetail'].count = parseInt(list[0]['techniques'][index]['techniqueDetail'].count)
            setOrderNotExecution(list)
        } else {
            const {value} = e.target
            const list = [...orderNotExecution]
            list[0]['techniques'][index]['techniqueDetail'].count = parseInt(value)
            setOrderNotExecution(list)
        }
    }

    const saveData = () => {
        documents.listOrderNotExecution.techniques.map(itemTechnique => orderNotExecution[0].techniques.map(itemDetail =>
            itemDetail.techniqueDetail.count !== itemTechnique.techniqueDetail.count
                ?
                documents.setDocumentConfirmChangedTechniques([...documents.documentConfirmChangedTechniques, {
                    'techniqueDetailId': itemDetail.techniqueDetail.techniqueDetailId,
                    'howCategoryId': itemDetail.techniqueDetail.howCategoryId,
                    'newCount': itemDetail.techniqueDetail.count,
                    'delete': false
                }])
                :
                ''
        ))
        documents.setListOrderNotExecution(orderNotExecution[0])
        setVisible(false)
    }

    return (
        <div>
            <h2>Редагування непідтвердженого наряду</h2>
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
                {orderNotExecution.map(({
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
                                    <th>Кількість</th>
                                    <th>Кількість яку передати</th>
                                    <th>Ціна за одиницю</th>
                                    <th>Дата створення</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {techniques
                                    ?
                                    techniques.map(({
                                                        techniqueName,
                                                        techniqueType,
                                                        techniqueDetail,
                                                        techniqueDetailId
                                                    }, indexTechnique) =>
                                        <tr key={indexTechnique}>
                                            <td>{techniqueName}</td>
                                            <td>{techniqueType}</td>
                                            <td>{techniqueDetail.serialNumber}</td>
                                            <td>{documents.listOrderNotExecution['techniques'][index]['techniqueDetail'].count}</td>
                                            <td>

                                                <MyInput value={techniqueDetail.count}
                                                         style={{textAlign: 'center', width: '50%'}}
                                                         onChange={(e) => handleCountChange(e, indexTechnique, techniqueDetail.techniqueDetailId)}/>

                                            </td>
                                            <td>{techniqueDetail.price}</td>
                                            <td>{techniqueDetail.dateOfManufacture}</td>
                                            <td>
                                                <IconButton size='small'
                                                            onClick={() => deleteTechnique(techniqueDetail.techniqueDetailId)}><DeleteIcon></DeleteIcon></IconButton>
                                            </td>
                                        </tr>
                                    )

                                    : <></>
                                }

                                </tbody>
                            </table>

                        </td>
                        {/*<td><IconButton size='small' onClick={() => setChangeData(true)}*/}
                        {/*><StorageIcon></StorageIcon></IconButton>*/}

                        {/*    <IconButton size='small'*/}
                        {/*                onClick={handleRemove}><DeleteIcon></DeleteIcon></IconButton>*/}
                        {/*</td>*/}
                    </tr>
                )}
                </tbody>
            </table>
            <IconButton size='small'
                        onClick={saveData}>
                <SaveIcon></SaveIcon></IconButton>
        </div>
    );
});

export default FormChangeDocumentTransmission;