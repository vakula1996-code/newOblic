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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';
import SaveIcon from '@mui/icons-material/Save';


const FormTechnique = observer(({setVisible, idTechnique}) => {
        const {technique} = useContext(Context)
        const [listTechnique, setListTechnique] = useState(technique.listTechnique[idTechnique])
        const [listTechniqueForTable, setListTechniqueForTable] = useState(technique.listTechniqueForTable[idTechnique])
        const [listDataValid, setListDataValid] = useState(technique.listTechniqueValid[idTechnique])
        console.log(listDataValid)
        useEffect(() => {
            setListTechnique(technique.listTechnique[idTechnique])
            setListTechniqueForTable(technique.listTechniqueForTable[idTechnique])
            setListDataValid(technique.listTechniqueValid[idTechnique])
        }, [idTechnique])
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
            setListDataValid({
                ...listDataValid, details: [...listDataValid.details, {
                    serialNumber: false,
                    price: false,
                    categoryId: false,
                    count: false,
                    dateOfManufacture: false
                }]
            })
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
            const listDataValid = {...listDataValid}
            listDataValid['details'].splice(index, 1)
            setListDataValid(listDataValid)
        };
        const addInListTeqchnique = () => {
            if (
                listTechnique.techniqueTypeId !== '' &&
                listTechnique.ensuringTypeId !== '' &&
                listTechnique.techniqueName !== '' &&
                listTechnique.techniqueName !== undefined &&
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
                        return false
                    }
                }).includes(false) === false) {
                    technique.setListTechnique(
                        technique.listTechnique.map((item, index) => {
                            if (index === idTechnique) {
                                return listTechnique
                            } else {
                                return item
                            }
                        })
                    )
                    technique.setListTechniqueForTable(
                        technique.listTechniqueForTable.map((item, index) => {
                            if (index === idTechnique) {
                                return listTechniqueForTable
                            } else {
                                return item
                            }
                        })
                    )
                    technique.setListTechniqueValid(
                        technique.listTechniqueValid.map((item, index) => {
                            if (index === idTechnique) {
                                return listTechnique
                            } else {
                                return item
                            }
                        })
                    )
                    setVisible(false)

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
            <Box className={classes.containerForm}><h2>Майно</h2>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>Найменування</th>
                        <th>Тип</th>
                        <th>Тип забезпечення</th>
                        <th>Одиниця виміру</th>
                        <th>
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
                                                      error={listDataValid.details[index].count}
                                                      errorLabel='Кількість повина бути більше 0'
                                                      getData={(e) => handleSerialNumberChange(e, index, 'count')}/></td>
                                        <td><InputMui value={listTechnique.details[index].serialNumber}
                                                      error={listDataValid.details[index].serialNumber}
                                                      getData={(e) => handleSerialNumberChange(e, index, 'serialNumber')}/>
                                        </td>
                                        <td><InputMui value={listTechnique.details[index].price}
                                                      error={listDataValid.details[index].price}
                                                      getData={(e) => handleSerialNumberChange(e, index, 'price')}/>

                                        </td>
                                        <td><InputDate value={listTechnique.details[index].dateOfManufacture}
                                                       error={listDataValid.details[index].dateOfManufacture}
                                                       getData={(e) => handleSerialNumberChange(e, index, 'dateOfManufacture')}/>

                                        </td>
                                        <td><Select nameSelect="category" value={listTechnique.details[index].categoryId}
                                                    name='categoryName'
                                                    error={listDataValid.details[index].categoryId}
                                                    getData={(e, data) => handleSerialNumberChange(e, index, 'categoryId', data)}/>

                                        </td>
                                        <td><IconButton size='small'
                                                        onClick={() => handleSerialNumberRemove(index)}><DeleteIcon></DeleteIcon></IconButton>
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
                            onClick={addInListTeqchnique}>
                    <SaveIcon></SaveIcon></IconButton>

            </Box>
        );

    })
;

export default FormTechnique;