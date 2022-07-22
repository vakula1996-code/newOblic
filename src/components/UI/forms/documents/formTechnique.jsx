import React, {useContext, useEffect, useState} from 'react';
import classes from "./form.module.css";
import Box from "@mui/material/Box";
import Input from "../../input/input";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {nameCategory} from "../../../../http/Type";


const FormTechnique = observer(() => {
    const {technique} = useContext(Context)
    const data = {
        techniqueTypeId: '',
        techniqueNameId: '',
        measurementId: '',
        count: '',
        details: [
            {
                serialNumber: '',
                price: '',
                categoryId: '',
                dateOfManufacture: ''
            }
        ]
    }
    const [listTechnique, setListTechnique] = useState(data)


    const handleSerialNumberAdd = () => {
        setListTechnique({
            ...listTechnique, details: [...listTechnique.details, {
                serialNumber: '',
                price: '',
                categoryId: '',
                dateOfManufacture: ''
            }]
        })

    }
    const handleSerialNumberChange = (e, index,name) => {

        const {value} = e.target;
        const list = {...listTechnique};
        list['details'][index][name] = value;
        setListTechnique(list);
    };

    const handleSerialNumberRemove = (index) => {
        const list = {...listTechnique};
        list['details'].splice(index, 1);
        setListTechnique(list);
    };


    const addInListTeqchnique= ()=>{
        technique.setListTechnique([...technique.listTechnique,listTechnique])
        setListTechnique(data)
    }

    const getCategory = () => {
        nameCategory(listTechnique.techniqueTypeId).then(data=> technique.setCategory(data))

    }
    useEffect(()=>{
        getCategory()
    },[listTechnique.techniqueTypeId])
    return (
        <Box className={classes.containerForm}><h2>Техніка</h2>

            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Тип</th>
                    <th>Одиниці виміру</th>
                    <th>Кількість</th>
                    <th>
                        <button className={classes.button}
                                type="button"
                                onClick={handleSerialNumberAdd}>
                            Добавити серійний номер
                        </button>
                        <button className={classes.button}
                                onClick={addInListTeqchnique}>
                            Добавити техніку</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><Select label='Назва' nameSelect="nameTechnique" value={listTechnique.techniqueNameId} name='techniqueName'
                                getData={(data) => setListTechnique({...listTechnique, techniqueNameId: data.target.value})}/></td>
                    <td><Select label='Тип' nameSelect="typeTechnique" value={listTechnique.techniqueTypeId} name='techniqueType'
                                getData={(data) => setListTechnique({...listTechnique, techniqueTypeId: data.target.value})}/></td>
                    <td><Select label='Одиниці виміру' nameSelect="measurements" value={listTechnique.measurementId} name='measurement'
                                getData={(data) => setListTechnique({...listTechnique, measurementId: data.target.value})}/></td>
                    <td><Input label='Кількість' value={listTechnique.count}
                               getData={(data) => setListTechnique({...listTechnique, count: data.target.value})}/></td>
                    <td>
                    <table>
                        <thead>
                        <tr>
                            <th>Серійний номер</th>
                            <th>Ціна</th>
                            <th>Дата створення</th>
                            <th>Категорія</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listTechnique.details.map(({serialNumber, price, categoryId, dateOfManufacture}, index) => (
                            <tr key={index}>
                                <td><Input value={listTechnique.details[index].serialNumber}
                                           getData={(e) => handleSerialNumberChange(e,index,'serialNumber')}/>
                                </td>
                                <td><Input  value={listTechnique.details[index].price}
                                            getData={(e) => handleSerialNumberChange(e,index,'price')}/>

                                </td>
                                <td><InputDate value={listTechnique.details[index].dateOfManufacture}
                                               getData={(e) => handleSerialNumberChange(e,index,'dateOfManufacture')}/>

                                </td>
                                <td><Select nameSelect="category" value={listTechnique.details[index].categoryId} name='categoryName'
                                            getData={(e) => handleSerialNumberChange(e,index,'categoryId')}/>

                                </td>
                                <td><button onClick={()=>handleSerialNumberRemove(index)}>Видалити</button></td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </Box>
    );
});

export default FormTechnique;