import React, {useContext} from 'react';
import classes from "./table.module.css";
import Box from "@mui/material/Box";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Select from "../input/select";
import InputMui from "../input/inputMui";
import InputDate from "../input/inputDate";
import MyButtonRemove from "../button/MyButtonRemove";
import MyButton from "../button/MyButton";
import {addNewTechniqueHttp, addNewTechniqueOutfitHttp} from "../../../http/Technique";

const Table = observer(({type}) => {
    const {document} = useContext(Context)

    const {technique} = useContext(Context)

    const  handleTechniqueRemove = (index) =>{
        const list = [...technique.listTechnique]
        list.splice(index, 1)
        technique.setListTechnique(list)
    }
    const handleSerialNumberRemove = (indexSerialNumber,indexTechnique) => {
        const list = [...technique.listTechnique]
        list[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListTechnique(list)
    }
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(document.document,technique.listTechnique,type)
    }
    return (
        <Box className={classes.containerTable}>
            {technique.listTechnique.length>0
                ?
                <div>
                <table className={classes.table}>
                    <caption><h2>Список техніки</h2></caption>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Назва</th>
                        <th>Тип</th>
                        <th>Тип забезпечення</th>
                        <th>Одиниці виміру</th>
                        <th>Детальні данні</th>
                        <th>Дія</th>
                    </tr>
                    </thead>
                    <tbody>
                    {technique.listTechnique.map(({techniqueTypeId,techniqueName,measurementId,details,ensuringTypeId},indexTechnique)=>
                        <tr key={indexTechnique}>
                            <td style={{fontSize:'x-large', paddingTop:'35px'}}>{indexTechnique+1}</td>
                            <td><InputMui label='Назва' value={techniqueName}/></td>
                            <td><Select label='Тип' nameSelect="typeTechnique" value={techniqueTypeId} name='techniqueType'
                            /></td>
                            <td><Select label='Тип забезпечення' nameSelect="typeEnsuring" value={ensuringTypeId}
                                        name='ensuringType'
                            /></td>
                            <td><Select label='Одиниці виміру' nameSelect="measurements" value={measurementId} name='measurement'
                            /></td>
                            <td>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Кількість</th>
                                        <th>Серійний номер</th>
                                        <th>Ціна</th>
                                        <th>Дата створення</th>
                                        <th>Категорія</th>
                                        <th>Дія</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {details.map(({serialNumber, price, categoryId, dateOfManufacture,count}, indexSerialNumber) => (
                                        <tr key={indexSerialNumber}>
                                            <td><InputMui label='Кількість' value={count}/></td>

                                            <td><InputMui label='Серійний номер' value={serialNumber}/>
                                            </td>
                                            <td><InputMui label='Ціна' value={price}/>

                                            </td>
                                            <td><InputDate value={dateOfManufacture}/>

                                            </td>
                                            <td><Select nameSelect="category" value={categoryId} name='categoryName'
                                            />

                                            </td>
                                            <td><MyButtonRemove onClick={()=>handleSerialNumberRemove(indexSerialNumber,indexTechnique)}>Видалити</MyButtonRemove></td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </td>
                            <td><MyButtonRemove onClick={()=>handleTechniqueRemove(indexTechnique)}>Видалити</MyButtonRemove></td>

                        </tr>
                    )}
                    </tbody>
                </table>
                    <MyButton className={classes.button} onClick={addNewTeqchnique}>Виконати дію</MyButton>
                </div>

                :
                <h2>Добавте техніку в сиписок</h2>

            }

        </Box>
    );
});

export default Table;