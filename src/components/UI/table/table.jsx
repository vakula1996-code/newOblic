import React, {useContext} from 'react';
import classes from "./table.module.css";
import Box from "@mui/material/Box";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Select from "../input/select";
import Input from "../input/input";
import InputDate from "../input/inputDate";

const Table = observer(() => {
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
    return (
        <Box className={classes.containerTable}>
            {technique.listTechnique.length>0
                ?
                <table className={classes.table}>
                    <caption><h2>Список техніки</h2></caption>
                    <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Тип</th>
                        <th>Одиниці виміру</th>
                        <th>Кількість</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {technique.listTechnique.map(({techniqueTypeId,techniqueNameId,measurementId,count,details},indexTechnique)=>
                        <tr key={indexTechnique}>
                            <td><Select label='Назва' nameSelect="nameTechnique" value={techniqueNameId} name='techniqueName'
                            /></td>
                            <td><Select label='Тип' nameSelect="typeTechnique" value={techniqueTypeId} name='techniqueType'
                            /></td>
                            <td><Select label='Одиниці виміру' nameSelect="measurements" value={measurementId} name='measurement'
                            /></td>
                            <td><Input label='Кількість' value={count}/></td>
                            <td>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Серійний номер</th>
                                        <th>Ціна</th>
                                        <th>Дата створення</th>
                                        <th>Категорія</th>
                                        {/*<th></th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {details.map(({serialNumber, price, categoryId, dateOfManufacture}, indexSerialNumber) => (
                                        <tr key={indexSerialNumber}>
                                            <td><Input value={serialNumber}/>
                                            </td>
                                            <td><Input  value={price}/>

                                            </td>
                                            <td><InputDate value={dateOfManufacture}/>

                                            </td>
                                            <td><Select nameSelect="category" value={categoryId} name='categoryName'
                                            />

                                            </td>
                                            <td><button onClick={()=>handleSerialNumberRemove(indexSerialNumber,indexTechnique)}>Видалити</button></td>
                                        </tr>
                                    ))}

                                    </tbody>
                                </table>
                            </td>
                            <td><button onClick={()=>handleTechniqueRemove(indexTechnique)}>Видалити</button></td>

                        </tr>
                    )}
                    </tbody>
                </table>
                :
                <h2>Добавте техніку в сиписок</h2>

            }

        </Box>
    );
});

export default Table;