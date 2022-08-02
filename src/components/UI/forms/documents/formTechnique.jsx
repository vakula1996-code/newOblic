import React, {useContext, useEffect, useState} from 'react';
import classes from "./form.module.css";
import Box from "@mui/material/Box";
import InputMui from "../../input/inputMui";
import Select from "../../input/select";
import InputDate from "../../input/inputDate";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {nameCategory} from "../../../../http/Type";
import MyButtonRemove from "../../button/MyButtonRemove";
import MyButton from "../../button/MyButton";


const FormTechnique = observer(() => {
    const {technique} = useContext(Context)
    const data = {
        techniqueTypeId: '',
        ensuringTypeId: '',
        techniqueName: '',
        measurementId: '',
        details: [
            {
                serialNumber: 'Б/Н',
                price: '',
                categoryId: '',
                count: 1,
                dateOfManufacture: ''
            }
        ]
    }

    const dateError = {
        techniqueTypeId: false,
        ensuringTypeId: false,
        techniqueName: false,
        measurementId: false,
        detail:
            {
                serialNumber: false,
                price: false,
                categoryId: false,
                count: false,
                dateOfManufacture: false
            }

    }

    const [listTechnique, setListTechnique] = useState(data)
    const [error, setError] = useState(dateError)

    const handleSerialNumberAdd = () => {
        setListTechnique({
            ...listTechnique, details: [...listTechnique.details, {
                serialNumber: '',
                price: '',
                categoryId: '',
                count: 1,
                dateOfManufacture: ''
            }]
        })

    }
    const handleSerialNumberChange = (e, index, name) => {

        const {value} = e.target;
        const list = {...listTechnique};
        if (name === 'count') {
            list['details'][index][name] = parseInt(value);
        } else {
            list['details'][index][name] = value;
        }
        setListTechnique(list);
    };

    const handleSerialNumberRemove = (index) => {
        const list = {...listTechnique};
        list['details'].splice(index, 1);
        setListTechnique(list);
    };


    const addInListTeqchnique = () => {

        if (
            listTechnique.techniqueTypeId !== '' &&
            listTechnique.ensuringTypeId !== '' &&
            listTechnique.techniqueName !== '' &&
            listTechnique.measurementId !== ''
        ) {

            listTechnique.details.map(({serialNumber, price, categoryId, dateOfManufacture}) => {
                if (
                    serialNumber !== '' &&
                    price !== '' &&
                    categoryId !== '' &&
                    dateOfManufacture !== ''
                ) {
                    technique.setListTechnique([...technique.listTechnique, listTechnique])
                    setListTechnique(data)
                }
            })
        } else {
            switch (error) {
                case error.techniqueName.length :
                    setError({...error, techniqueName: true})
                    break
            }
        }

    }
    const getCategory = () => {
        if (listTechnique.techniqueTypeId) {
            nameCategory(listTechnique.techniqueTypeId).then(data => technique.setCategory(data))
        }
    }
    useEffect(() => {
        getCategory()
    }, [listTechnique.techniqueTypeId])
    return (
        <Box className={classes.containerForm}><h2>Техніка</h2>

            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Назва</th>
                    <th>Тип</th>
                    <th>Тип забезпечення</th>
                    <th>Одиниці виміру</th>
                    <th>
                        <MyButton className={classes.button}
                                  type="button"
                                  onClick={handleSerialNumberAdd}>
                            Додати
                        </MyButton>

                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><InputMui label='Назва' value={listTechnique.techniqueName}
                                  error={error.techniqueName}
                                  getData={(data) => setListTechnique({
                                      ...listTechnique,
                                      techniqueName: data.target.value
                                  })}/></td>
                    <td><Select label='Тип' nameSelect="typeTechnique" value={listTechnique.techniqueTypeId}
                                error={error.techniqueTypeId}

                                name='techniqueType'
                                getData={(data) => setListTechnique({
                                    ...listTechnique,
                                    techniqueTypeId: data.target.value
                                })}/></td>
                    <td><Select label='Тип забезпечення' nameSelect="typeEnsuring" value={listTechnique.ensuringTypeId}
                                error={error.ensuringTypeId}

                                name='ensuringType'
                                getData={(data) => setListTechnique({
                                    ...listTechnique,
                                    ensuringTypeId: data.target.value
                                })}/></td>
                    <td><Select label='Одиниці виміру' nameSelect="measurements" value={listTechnique.measurementId}
                                error={error.measurementId}

                                name='measurement'
                                getData={(data) => setListTechnique({
                                    ...listTechnique,
                                    measurementId: data.target.value
                                })}/></td>
                    <td>

                        <table>
                            <thead>
                            <tr>
                                <th>Кількість</th>
                                <th>Серійний номер</th>
                                <th>Ціна</th>
                                <th>Дата створення</th>
                                <th>Категорія</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {listTechnique.details.map(({
                                                            serialNumber,
                                                            price,
                                                            categoryId,
                                                            dateOfManufacture
                                                        }, index) => (
                                <tr key={index}>
                                    <td><InputMui value={listTechnique.details[index].count}
                                        // error={error.detail.count}
                                                  getData={(e) => handleSerialNumberChange(e, index, 'count')}/></td>
                                    <td><InputMui value={listTechnique.details[index].serialNumber}
                                        // error={error.detail.serialNumber}
                                                  getData={(e) => handleSerialNumberChange(e, index, 'serialNumber')}/>
                                    </td>
                                    <td><InputMui value={listTechnique.details[index].price}
                                        // error={error.detail.price}
                                                  getData={(e) => handleSerialNumberChange(e, index, 'price')}/>

                                    </td>
                                    <td><InputDate value={listTechnique.details[index].dateOfManufacture}
                                        // error={error.detail.dateOfManufacture}
                                                   getData={(e) => handleSerialNumberChange(e, index, 'dateOfManufacture')}/>

                                    </td>
                                    <td><Select nameSelect="category" value={listTechnique.details[index].categoryId}
                                                name='categoryName'
                                        // error={error.detail.categoryId}
                                                getData={(e) => handleSerialNumberChange(e, index, 'categoryId')}/>

                                    </td>
                                    <td><MyButtonRemove
                                        onClick={() => handleSerialNumberRemove(index)}>Видалити</MyButtonRemove></td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <MyButton className={classes.button}
                      onClick={addInListTeqchnique}>
                Добавити техніку</MyButton>
        </Box>
    );
});

export default FormTechnique;