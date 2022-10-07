import React, {useContext, useEffect, useState} from 'react';
import classes from "./form.module.css";
import Box from "@mui/material/Box";
import InputMui from "../../input/inputMui";
import Select from "../../select/select";
import InputDate from "../../input/inputDate";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {nameCategory} from "../../../../http/Type";
import DateNow from "../../calendar/dateNow";
import InputAutocomplit from "../../input/InputAutocomplit";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {v4 as uuidv4} from "uuid";


const FormTechnique = observer(({setVisible}) => {
        const {technique} = useContext(Context)
        const id = uuidv4()
        const idDetail = uuidv4()
        const data = {
            id: id,
            techniqueTypeId: '',
            ensuringTypeId: '',
            techniqueName: '',
            measurementId: '',
            details: [
                {
                    idDetail: idDetail,
                    serialNumber: 'Б/Н',
                    price: '',
                    categoryId: '',
                    count: 1,
                    dateOfManufacture: DateNow()
                }
            ]
        }
        const dataForTable = {
            id: id,
            techniqueTypeId: '',
            ensuringTypeId: '',
            techniqueName: '',
            measurementId: '',
            details: [
                {
                    idDetail: idDetail,
                    serialNumber: 'Б/Н',
                    price: '',
                    categoryId: '',
                    count: 1,
                    dateOfManufacture: DateNow()
                }
            ]
        }

        const dataValid = {
            id: id,
            techniqueTypeId: false,
            ensuringTypeId: false,
            techniqueName: false,
            measurementId: false,
            details: [
                {
                    idDetail: idDetail,
                    serialNumber: false,
                    price: false,
                    categoryId: false,
                    count: false,
                    dateOfManufacture: false
                }
            ]
        }
        const [listTechnique, setListTechnique] = useState(data)
        const [listTechniqueForTable, setListTechniqueForTable] = useState(dataForTable)
        const [listDataValid, setListDataValid] = useState(dataValid)
        const handleTechniqueChange = (e, name, data) => {
            if (e.target.innerHTML) {
                const list = {...listTechnique};
                if (e.target.innerHTML.includes('<path') !== true) {
                    list[name] = e.target.innerHTML
                    setListTechnique(list)
                } else {
                    list[name] = ''
                    setListTechnique(list)
                }
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
            const id = uuidv4()
            setListTechnique({
                ...listTechnique, details: [...listTechnique.details, {
                    idDetail: id,
                    serialNumber: 'Б/Н',
                    price: '',
                    categoryId: '',
                    count: 1,
                    dateOfManufacture: DateNow()
                }]
            })
            setListTechniqueForTable({
                ...listTechniqueForTable, details: [...listTechniqueForTable.details, {
                    idDetail: id,
                    serialNumber: 'Б/Н',
                    price: '',
                    categoryId: '',
                    count: 1,
                    dateOfManufacture: DateNow()
                }]
            })
            setListDataValid({
                ...listDataValid, details: [...listDataValid.details, {
                    idDetail: id,
                    serialNumber: false,
                    price: false,
                    categoryId: false,
                    count: false,
                    dateOfManufacture: false
                }]
            })
        }
        const handleChange = (e, index, name, data) => {

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

        const handleChangeCount = (e, index, name) => {
            const {value} = e.target;
            const list = {...listTechnique};
            if (list['details'][index]['serialNumber'] !== 'Б/Н') {
                list['details'][index][name] = 1
            } else {
                if (value.length === 0) {
                    list['details'][index][name] = 0;
                } else {
                    list['details'][index][name] = parseInt(value);
                }
            }
            setListTechnique(list);
        }
        const handleChangeSerialNumber = (e, index, name) => {
            const {value} = e.target;
            const list = {...listTechnique};
            list['details'][index][name] = value;
            list['details'][index]['count'] = 1;
            setListTechnique(list);
        }

        const handleSerialNumberRemove = (id) => {
            setListTechnique((listLocal) => ({
                ...listLocal,
                details: listLocal.details.filter(listItem => listItem.idDetail !== id)
            }))
            setListTechniqueForTable((listLocal) => ({
                ...listLocal,
                details: listLocal.details.filter(listItem => listItem.idDetail !== id)
            }))
            setListDataValid((listLocal) => ({
                ...listLocal,
                details: listLocal.details.filter(listItem => listItem.idDetail !== id)
            }))
        };

        const addInListTeqchnique = () => {
            if (
                listTechnique.techniqueTypeId !== '' &&
                listTechnique.ensuringTypeId !== '' &&
                listTechnique.techniqueName !== '' &&
                listTechnique.measurementId !== ''
            ) {
                if (listTechnique.details.map(({count, serialNumber, price, categoryId, dateOfManufacture}, index) => {
                    if (
                        count !== '' &&
                        serialNumber !== '' &&
                        price !== '' &&
                        categoryId !== '' &&
                        dateOfManufacture !== ''
                    ) {
                        return true
                    } else {
                        setListDataValid({
                            ...listDataValid,
                            techniqueName: (
                                listTechnique.techniqueName === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            techniqueTypeId: (
                                listTechnique.techniqueTypeId === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            ensuringTypeId: (
                                listTechnique.ensuringTypeId === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            measurementId: (
                                listTechnique.measurementId === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            details: listDataValid.details.map((item, index) => {
                                return {
                                    ...item,
                                    count: (
                                        listTechnique.details[index].count === ''
                                            ?
                                            true
                                            :
                                            false
                                    ),
                                    serialNumber: (
                                        listTechnique.details[index].serialNumber === ''
                                            ?
                                            true
                                            :
                                            false
                                    ),
                                    price: (
                                        listTechnique.details[index].price === ''
                                            ?
                                            true
                                            :
                                            false
                                    ),
                                    categoryId: (
                                        listTechnique.details[index].categoryId === ''
                                            ?
                                            true
                                            :
                                            false
                                    ),
                                    dateOfManufacture: (
                                        listTechnique.details[index].dateOfManufacture === ''
                                            ?
                                            true
                                            :
                                            false
                                    )
                                }
                            })
                        })
                        return false
                    }
                }).includes(false) === false) {
                    technique.setListTechnique([...technique.listTechnique, listTechnique])
                    setListTechnique(data)
                    technique.setListTechniqueForTable([...technique.listTechniqueForTable, listTechniqueForTable])
                    setListTechniqueForTable(dataForTable)
                    technique.setListTechniqueValid([...technique.listTechniqueValid, listDataValid])
                    setVisible(false)
                    setListDataValid(dataValid)
                }
            } else {
                setListDataValid({
                    ...listDataValid,
                    techniqueName: (
                        listTechnique.techniqueName === ''
                            ?
                            true
                            :
                            false
                    ),
                    techniqueTypeId: (
                        listTechnique.techniqueTypeId === ''
                            ?
                            true
                            :
                            false
                    ),
                    ensuringTypeId: (
                        listTechnique.ensuringTypeId === ''
                            ?
                            true
                            :
                            false
                    ),
                    measurementId: (
                        listTechnique.measurementId === ''
                            ?
                            true
                            :
                            false
                    ),
                    details: listDataValid.details.map((item, index) => {
                        return {
                            ...item,
                            count: (
                                listTechnique.details[index].count === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            serialNumber: (
                                listTechnique.details[index].serialNumber === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            price: (
                                listTechnique.details[index].price === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            categoryId: (
                                listTechnique.details[index].categoryId === ''
                                    ?
                                    true
                                    :
                                    false
                            ),
                            dateOfManufacture: (
                                listTechnique.details[index].dateOfManufacture === ''
                                    ?
                                    true
                                    :
                                    false
                            )
                        }
                    })
                })
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
            <Box className={classes.containerForm}>
                <h2>Майно</h2>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>Найменування</th>
                        <th>Тип</th>
                        <th>Тип забезпечення</th>
                        <th>Одиниця виміру</th>
                        <th style={{zIndex: 9}}>
                            Додаткові дані
                            <IconButton size='small'
                                        onClick={handleSerialNumberAdd}>
                                <AddBoxIcon></AddBoxIcon></IconButton>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><InputAutocomplit value={listTechnique.techniqueName}
                                              error={listDataValid.techniqueName}
                                              label='Найменування'
                                              getData={(e) => handleTechniqueChange(e, 'techniqueName')}/></td>
                        <td><Select label='Тип' nameSelect="typeTechnique" value={listTechnique.techniqueTypeId}
                                    error={listDataValid.techniqueTypeId}

                                    name='techniqueType'
                                    getData={(e, data) => handleTechniqueChange(e, 'techniqueTypeId', data)}/></td>
                        <td><Select label='Тип забезпечення' nameSelect="typeEnsuring" value={listTechnique.ensuringTypeId}
                                    error={listDataValid.ensuringTypeId}

                                    name='ensuringType'
                                    getData={(e, data) => handleTechniqueChange(e, 'ensuringTypeId', data)}/></td>
                        <td><Select label='Одиниці виміру' nameSelect="measurements" value={listTechnique.measurementId}
                                    error={listDataValid.measurementId}

                                    name='measurement'
                                    getData={(e, data) => handleTechniqueChange(e, 'measurementId', data)}/></td>
                        <td>

                            <table className={classes.doubleTable}>
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
                                                                idDetail,
                                                                serialNumber,
                                                                price,
                                                                categoryId,
                                                                dateOfManufacture
                                                            }, index) => (
                                    <tr key={idDetail}>
                                        <td><InputMui value={listTechnique.details[index].count}
                                                      error={listDataValid.details[index].count}
                                                      errorLabel='Кількість повина бути більше 0'
                                                      getData={(e) => handleChangeCount(e, index, 'count')}
                                        /></td>
                                        <td><InputMui value={listTechnique.details[index].serialNumber}
                                                      error={listDataValid.details[index].serialNumber}
                                                      getData={(e) => handleChangeSerialNumber(e, index, 'serialNumber')}/>
                                        </td>
                                        <td><InputMui value={listTechnique.details[index].price}
                                                      error={listDataValid.details[index].price}
                                                      type='number'
                                                      getData={(e) => handleChange(e, index, 'price')}/>

                                        </td>
                                        <td><InputDate value={listTechnique.details[index].dateOfManufacture}
                                                       error={listDataValid.details[index].dateOfManufacture}
                                                       getData={(e) => handleChange(e, index, 'dateOfManufacture')}/>

                                        </td>
                                        <td><Select nameSelect="category" value={listTechnique.details[index].categoryId}
                                                    name='categoryName'
                                                    error={listDataValid.details[index].categoryId}
                                                    getData={(e, data) => handleChange(e, index, 'categoryId', data)}/>

                                        </td>
                                        <td><IconButton size='small'
                                                        onClick={() => handleSerialNumberRemove(idDetail)}><DeleteIcon></DeleteIcon></IconButton>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <IconButton size='small'
                            onClick={addInListTeqchnique}
                >
                    <SaveIcon></SaveIcon></IconButton>
            </Box>
        );

    })
;

export default FormTechnique;