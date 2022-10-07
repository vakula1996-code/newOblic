import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {toJS} from "mobx";
import InputDate from "../../input/inputDate";
import classes from "../table.module.css"
import InputFile from "../../input/inputFile";
import IconButton from "@mui/material/IconButton";
import StorageIcon from "@mui/icons-material/Storage";
import DeleteIcon from "@mui/icons-material/Delete";

const TableMoveExecution = observer(({dateConfirm, setDateConfirm, file, setFile, setChangeData}) => {
    const {documents} = useContext(Context)
    const handleRemove = () => {
        documents.setListOrderNotExecution([])
    }

    return (
        toJS(documents.listOrderNotExecution).length !== 0
            ?
            <div>
                <h2>Непідтверджений наряд</h2>
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
                        <th></th>
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
                                        <th>Кількість</th>
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
                                                            techniqueDetail,
                                                            count
                                                        }, indexTechnique) =>
                                            <tr key={indexTechnique}>
                                                <td>{techniqueName}</td>
                                                <td>{techniqueType}</td>
                                                <td>{techniqueDetail.serialNumber}</td>
                                                <td>{techniqueDetail.count}</td>
                                                <td>{techniqueDetail.price}</td>
                                                <td>{techniqueDetail.dateOfManufacture}</td>
                                            </tr>
                                        )

                                        : <></>
                                    }

                                    </tbody>
                                </table>

                            </td>
                            <td><IconButton size='small' onClick={() => setChangeData(true)}
                            ><StorageIcon></StorageIcon></IconButton>

                                <IconButton size='small'
                                            onClick={handleRemove}><DeleteIcon></DeleteIcon></IconButton>
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
                        <InputFile name='file' onChange={(e) => setFile(e.target.files[0])} value={file}/>
                    </div>
                </div>

            </div>
            : <h2>Оберіть непідтверджений наряд</h2>
    );
});

export default TableMoveExecution;