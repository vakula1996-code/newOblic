import React, {useContext, useEffect, useState} from 'react';
import classes from "./form.module.css";
import Box from "@mui/material/Box";
import InputMui from "../../input/inputMui";
import Select from "../../select/select";
import InputDate from "../../input/inputDate";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {nameCategory} from "../../../../http/Type";
import MyButtonRemove from "../../button/MyButtonRemove";
import MyButton from "../../button/MyButton";
import DateNow from "../../calendar/dateNow";
import InputAutocomplit from "../../input/InputAutocomplit";


const FormTechnique = observer(({setVisible}) => {
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
                    dateOfManufacture: DateNow()
                }
            ]
        }
        const dataForTable = {
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
                    dateOfManufacture: DateNow()
                }
            ]
        }
        const [stateAllTable, setStateAllTable] = useState(false)

        const [listTechnique, setListTechnique] = useState(data)
        const [listTechniqueForTable, setListTechniqueForTable] = useState(dataForTable)
        const [errorTechniqueTypeId, setErrorTechniqueTypeId] = useState(false)
        const [errorTechniqueName, setErrorTechniqueName] = useState(false)
        const [errorEnsuringTypeId, setErrorEnsuringTypeId] = useState(false)
        const [errorMeasurementId, setErrorMeasurementId] = useState(false)
        const [errorSerialNumber, setErrorSerialNumber] = useState([{state: false}])
        const [errorPrice, setErrorPrice] = useState([{state: false}])
        const [errorCount, setErrorCount] = useState([{state: false}])
        const [errorCategoryId, setErrorCategoryId] = useState([{state: false}])
        const [errorDateOfManufacture, setErrorDateOfManufacture] = useState([{state: false}])
        const handleTechniqueChange = (e, name, data) => {
            if (e.target.innerHTML) {
                const list = {...listTechnique};
                list[name] = e.target.innerHTML
                setListTechnique(list)
                if (data) {
                    const listForTable = {...listTechniqueForTable};
                    listForTable[name] = data.props.children
                    setListTechniqueForTable(listForTable)
                } else {
                    const listForTable = {...listTechniqueForTable};
                    listForTable[name] = e.target.innerHTML
                    setListTechniqueForTable(listForTable)
                }
            } else {
                const {value} = e.target
                const list = {...listTechnique};
                list[name] = value
                setListTechnique(list)
                if (data) {
                    const listForTable = {...listTechniqueForTable};
                    listForTable[name] = data.props.children
                    setListTechniqueForTable(listForTable)
                } else {
                    const {value} = e.target;
                    const listForTable = {...listTechniqueForTable};
                    listForTable[name] = value
                    setListTechniqueForTable(listForTable)
                }
            }

        }
        const handleSerialNumberAdd = () => {
            setListTechnique({
                ...listTechnique, details: [...listTechnique.details, {
                    serialNumber: 'Б/Н',
                    price: '',
                    categoryId: '',
                    count: 1,
                    dateOfManufacture: DateNow()
                }]
            })
            setListTechniqueForTable({
                ...listTechniqueForTable, details: [...listTechniqueForTable.details, {
                    serialNumber: 'Б/Н',
                    price: '',
                    categoryId: '',
                    count: 1,
                    dateOfManufacture: DateNow()
                }]
            })
            setErrorSerialNumber([...errorSerialNumber, {state: false}])
            setErrorPrice([...errorPrice, {state: false}])
            setErrorCount([...errorCount, {state: false}])
            setErrorDateOfManufacture([...errorDateOfManufacture, {state: false}])
            setErrorCategoryId([...errorCategoryId, {state: false}])
        }
        const handleSerialNumberChange = (e, index, name, data) => {

            const {value} = e.target;
            const list = {...listTechnique};
            if (name === 'count') {
                if (value.length === 0) {
                    list['details'][index][name] = 0;
                } else {
                    list['details'][index][name] = parseInt(value);
                }
            } else {
                list['details'][index][name] = value;
            }
            setListTechnique(list);
            if (data) {
                const listForTable = {...listTechniqueForTable}
                listForTable['details'][index][name] = data.props.children
                setListTechniqueForTable(listForTable)
            } else {
                const {value} = e.target;
                const listForTable = {...listTechniqueForTable}
                listForTable['details'][index][name] = value
                setListTechniqueForTable(listForTable)
            }


        };

        const handleSerialNumberRemove = (index) => {
            const list = {...listTechnique};
            list['details'].splice(index, 1);
            setListTechnique(list);
            const listForTable = {...listTechniqueForTable}
            listForTable['details'].splice(index, 1);
            setListTechniqueForTable(listForTable);
            const listErrorSerialNumber = [...errorSerialNumber]
            listErrorSerialNumber.splice(index, 1)
            setErrorSerialNumber(listErrorSerialNumber)
            const listErrorPrice = [...errorPrice]
            listErrorPrice.splice(index, 1)
            setErrorPrice(listErrorPrice)
            const listErrorCount = [...errorCount]
            listErrorCount.splice(index, 1)
            setErrorCount(listErrorCount)

            const listErrorDateOfManufacture = [...errorDateOfManufacture]
            listErrorDateOfManufacture.splice(index, 1)
            setErrorDateOfManufacture(listErrorDateOfManufacture)
        };
        const addInListTeqchnique = () => {
            if (
                listTechnique.techniqueTypeId !== '' &&
                listTechnique.ensuringTypeId !== '' &&
                listTechnique.techniqueName !== '' &&
                listTechnique.measurementId !== ''
            ) {
                listTechnique.details.map(({count, serialNumber, price, categoryId, dateOfManufacture}) => {
                    if (
                        count !== '' &&
                        serialNumber !== '' &&
                        price !== '' &&
                        categoryId !== '' &&
                        dateOfManufacture !== ''
                    ) {
                        setStateAllTable(true)
                    } else {
                        setStateAllTable(false)
                    }
                })
            }
            if (stateAllTable === false) {

                if (listTechnique.techniqueName === '') {
                    setErrorTechniqueName(true)
                } else {
                    setErrorTechniqueName(false)
                }
                if (listTechnique.techniqueTypeId === '') {
                    setErrorTechniqueTypeId(true)
                } else {
                    setErrorTechniqueTypeId(false)
                }
                if (listTechnique.ensuringTypeId === '') {
                    setErrorEnsuringTypeId(true)
                } else {
                    setErrorEnsuringTypeId(false)
                }
                if (listTechnique.measurementId === '') {
                    setErrorMeasurementId(true)
                } else {
                    setErrorMeasurementId(false)
                }

                listTechnique.details.map(({count, serialNumber, price, categoryId, dateOfManufacture}, index) => {
                    if (serialNumber === '') {
                        const list = [...errorSerialNumber];
                        list[index]['state'] = true
                        setErrorSerialNumber(list)
                    } else {
                        const list = [...errorSerialNumber];
                        list[index]['state'] = false
                        setErrorSerialNumber(list)

                    }
                    if (price === '') {
                        const list = [...errorPrice];
                        list[index]['state'] = true
                        setErrorPrice(list)
                    } else {
                        const list = [...errorPrice];
                        list[index]['state'] = false
                        setErrorPrice(list)

                    }

                    if (count === 0) {
                        const list = [...errorCount];
                        list[index]['state'] = true
                        setErrorCount(list)
                    } else {
                        const list = [...errorCount];
                        list[index]['state'] = false
                        setErrorCount(list)

                    }

                    if (categoryId === '') {

                        const list = [...errorCategoryId];
                        list[index]['state'] = true
                        setErrorCategoryId(list)
                    } else {
                        const list = [...errorCategoryId];
                        list[index]['state'] = false
                        setErrorCategoryId(list)

                    }
                    if (dateOfManufacture === '') {

                        const list = [...errorDateOfManufacture];
                        list[index]['state'] = true
                        setErrorDateOfManufacture(list)
                    } else {
                        const list = [...errorDateOfManufacture];
                        list[index]['state'] = false
                        setErrorDateOfManufacture(list)

                    }
                })

            }
            if (stateAllTable === true) {
                technique.setListTechnique([...technique.listTechnique, listTechnique])
                setListTechnique(data)
                technique.setListTechniqueForTable([...technique.listTechniqueForTable, listTechniqueForTable])
                setListTechniqueForTable(dataForTable)
                setVisible(false)
                setStateAllTable(false)
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
            <Box className={classes.containerForm}><h2>Майно</h2>
                <MyButton className={classes.button}
                          style={{marginBottom: '10px'}}
                          onClick={addInListTeqchnique}>
                    Додати до списку</MyButton>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>Найменування</th>
                        <th>Тип</th>
                        <th>Тип забезпечення</th>
                        <th>Одиниця виміру</th>
                        <th>
                            Додаткові дані
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><InputAutocomplit value={listTechnique.techniqueName}
                                              error={errorTechniqueName}
                                              label='Найменування'
                                              getData={(e) => handleTechniqueChange(e, 'techniqueName')}/></td>
                        <td><Select label='Тип' nameSelect="typeTechnique" value={listTechnique.techniqueTypeId}
                                    error={errorTechniqueTypeId}

                                    name='techniqueType'
                                    getData={(e, data) => handleTechniqueChange(e, 'techniqueTypeId', data)}/></td>
                        <td><Select label='Тип забезпечення' nameSelect="typeEnsuring" value={listTechnique.ensuringTypeId}
                                    error={errorEnsuringTypeId}

                                    name='ensuringType'
                                    getData={(e, data) => handleTechniqueChange(e, 'ensuringTypeId', data)}/></td>
                        <td><Select label='Одиниці виміру' nameSelect="measurements" value={listTechnique.measurementId}
                                    error={errorMeasurementId}

                                    name='measurement'
                                    getData={(e, data) => handleTechniqueChange(e, 'measurementId', data)}/></td>
                        <td>

                            <table>
                                <thead>
                                <tr>
                                    <th>Кількість</th>
                                    <th>Серійний номер</th>
                                    <th>Ціна за одниницю</th>
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
                                                      error={errorCount[index]['state']}
                                                      errorLabel='Кількість повина бути більше 0'
                                                      getData={(e) => handleSerialNumberChange(e, index, 'count')}/></td>
                                        <td><InputMui value={listTechnique.details[index].serialNumber}
                                                      error={errorSerialNumber[index]['state']}
                                                      getData={(e) => handleSerialNumberChange(e, index, 'serialNumber')}/>
                                        </td>
                                        <td><InputMui value={listTechnique.details[index].price}
                                                      error={errorPrice[index]['state']}
                                                      getData={(e) => handleSerialNumberChange(e, index, 'price')}/>

                                        </td>
                                        <td><InputDate value={listTechnique.details[index].dateOfManufacture}
                                                       error={errorDateOfManufacture[index]['state']}
                                                       getData={(e) => handleSerialNumberChange(e, index, 'dateOfManufacture')}/>

                                        </td>
                                        <td><Select nameSelect="category" value={listTechnique.details[index].categoryId}
                                                    name='categoryName'
                                                    error={errorCategoryId[index]['state']}
                                                    getData={(e, data) => handleSerialNumberChange(e, index, 'categoryId', data)}/>

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
                          type="button"
                          onClick={handleSerialNumberAdd}>
                    Додати додаткові дані
                </MyButton>

            </Box>
        );

    })
;

export default FormTechnique;