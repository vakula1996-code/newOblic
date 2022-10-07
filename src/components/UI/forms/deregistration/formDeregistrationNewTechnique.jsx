import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import DateNow from "../../calendar/dateNow";
import Box from "@mui/material/Box";
import classes from "../documents/form.module.css";
import InputAutocomplit from "../../input/InputAutocomplit";
import Select from "../../select/select";
import InputMui from "../../input/inputMui";
import InputDate from "../../input/inputDate";
import {nameCategory} from "../../../../http/Type";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SaveIcon from "@mui/icons-material/Save";
import {v4 as uuidv4} from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";


const FormDeregistrationNewTechnique = observer(({setVisible}) => {
    const {technique} = useContext(Context)
    const id = uuidv4()
    const idDetail = uuidv4()
    const data = {
        id: id,
        techniqueTypeId: '',
        ensuringTypeId: '',
        techniqueName: '',
        measurementId: '',
        subdivisionId: '',
        detail: [
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
        subdivisionId: '',
        detail:
            [{
                idDetail: idDetail,
                serialNumber: 'Б/Н',
                price: '',
                categoryId: '',
                count: 1,
                dateOfManufacture: DateNow()
            }]

    }

    const dataValid = {
        id: id,
        techniqueTypeId: false,
        ensuringTypeId: false,
        techniqueName: false,
        measurementId: false,
        subdivisionId: false,
        detail: [
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
            ...listTechnique, detail: [...listTechnique.detail, {
                idDetail: id,
                serialNumber: 'Б/Н',
                price: '',
                categoryId: '',
                count: 1,
                dateOfManufacture: DateNow()
            }]
        })
        setListTechniqueForTable({
            ...listTechniqueForTable, detail: [...listTechniqueForTable.detail, {
                idDetail: id,
                serialNumber: 'Б/Н',
                price: '',
                categoryId: '',
                count: 1,
                dateOfManufacture: DateNow()
            }]
        })
        setListDataValid({
            ...listDataValid, detail: [...listDataValid.detail, {
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
                list['detail'][index][name] = 0;
            } else {
                list['detail'][index][name] = parseInt(value);
            }

        } else {
            list['detail'][index][name] = value;
        }
        setListTechnique(list);
        if (data) {
            const listForTable = {...listTechniqueForTable}
            listForTable['detail'][index][name] = data.props.children
            setListTechniqueForTable(listForTable)
        } else {
            const {value} = e.target;
            const listForTable = {...listTechniqueForTable}
            listForTable['detail'][index][name] = value
            setListTechniqueForTable(listForTable)
        }

    };
    const handleChangeCount = (e, index, name) => {
        const {value} = e.target;
        const list = {...listTechnique};
        if (list['detail'][index]['serialNumber'] !== 'Б/Н') {
            list['detail'][index][name] = 1
        } else {
            if (value.length === 0) {
                list['detail'][index][name] = 0;
            } else {
                list['detail'][index][name] = parseInt(value);
            }
        }
        setListTechnique(list);
    }
    const handleChangeSerialNumber = (e, index, name) => {
        const {value} = e.target;
        const list = {...listTechnique};
        list['detail'][index][name] = value;
        list['detail'][index]['count'] = 1;
        setListTechnique(list);
    }
    const handleSerialNumberRemove = (id) => {
        setListTechnique((listLocal) => ({
            ...listLocal,
            detail: listLocal.detail.filter(listItem => listItem.idDetail !== id)
        }))
        setListTechniqueForTable((listLocal) => ({
            ...listLocal,
            detail: listLocal.detail.filter(listItem => listItem.idDetail !== id)
        }))
        setListDataValid((listLocal) => ({
            ...listLocal,
            detail: listLocal.detail.filter(listItem => listItem.idDetail !== id)
        }))
    };
    const addInListTeqchnique = () => {
        if (
            listTechnique.techniqueTypeId !== '' &&
            listTechnique.ensuringTypeId !== '' &&
            listTechnique.techniqueName !== '' &&
            listTechnique.techniqueName !== undefined &&
            listTechnique.measurementId !== '' &&
            listTechnique.subdivisionId !== ''
        ) {
            if (listTechnique.detail.map(({count, serialNumber, price, categoryId, dateOfManufacture}, index) => {
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
                        subdivisionId: (
                            listTechnique.subdivisionId === ''
                                ?
                                true
                                :
                                false
                        ),
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

                        detail: listDataValid.detail.map((item, index) => {
                            return {
                                ...item,
                                count: (
                                    listTechnique.detail[index].count === ''
                                        ?
                                        true
                                        :
                                        false
                                ),
                                serialNumber: (
                                    listTechnique.detail[index].serialNumber === ''
                                        ?
                                        true
                                        :
                                        false
                                ),
                                price: (
                                    listTechnique.detail[index].price === ''
                                        ?
                                        true
                                        :
                                        false
                                ),
                                categoryId: (
                                    listTechnique.detail[index].categoryId === ''
                                        ?
                                        true
                                        :
                                        false
                                ),
                                dateOfManufacture: (
                                    listTechnique.detail[index].dateOfManufacture === ''
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
                technique.setListNewTechniqueFromModernization([...technique.listNewTechniqueFromModernization, listTechnique])
                technique.setListNewTechniqueFromModernizationForTable([...technique.listNewTechniqueFromModernizationForTable, listTechniqueForTable])
                technique.setListTechniqueValid([...technique.listTechniqueValid, listDataValid])
                setListTechnique(data)
                setListTechniqueForTable(dataForTable)
                setListDataValid(dataValid)
                setVisible(false)
            }
        } else {
            setListDataValid({
                ...listDataValid,
                subdivisionId: (
                    listTechnique.subdivisionId === ''
                        ?
                        true
                        :
                        false
                ),
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

                detail: listDataValid.detail.map((item, index) => {
                    return {
                        ...item,
                        count: (
                            listTechnique.detail[index].count === ''
                                ?
                                true
                                :
                                false
                        ),
                        serialNumber: (
                            listTechnique.detail[index].serialNumber === ''
                                ?
                                true
                                :
                                false
                        ),
                        price: (
                            listTechnique.detail[index].price === ''
                                ?
                                true
                                :
                                false
                        ),
                        categoryId: (
                            listTechnique.detail[index].categoryId === ''
                                ?
                                true
                                :
                                false
                        ),
                        dateOfManufacture: (
                            listTechnique.detail[index].dateOfManufacture === ''
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
        if (listTechnique.techniqueTypeId !== '') {
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
                    <th>Підрозділ</th>
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
                    <td><Select
                        label="Частина в яку"
                        nameSelect="numberSubdivisions"
                        value={listTechnique.subdivisionId}
                        error={listDataValid.subdivisionId}
                        name='subdivisionName'
                        getData={(e, data) => handleTechniqueChange(e, 'subdivisionId', data)}/>
                    </td>
                    <td><InputAutocomplit
                        value={listTechnique.techniqueName}
                        error={listDataValid.techniqueName}
                        label='Найменування'
                        getData={(e) => handleTechniqueChange(e, 'techniqueName')}/></td>
                    <td><Select
                        label='Тип'
                        nameSelect="typeTechnique"
                        value={listTechnique.techniqueTypeId}
                        error={listDataValid.techniqueTypeId}
                        name='techniqueType'
                        getData={(e, data) => handleTechniqueChange(e, 'techniqueTypeId', data)}/></td>
                    <td><Select
                        label='Тип забезпечення'
                        nameSelect="typeEnsuring"
                        value={listTechnique.ensuringTypeId}
                        error={listDataValid.ensuringTypeId}
                        name='ensuringType'
                        getData={(e, data) => handleTechniqueChange(e, 'ensuringTypeId', data)}/></td>
                    <td><Select
                        label='Одиниця виміру'
                        nameSelect="measurements"
                        value={listTechnique.measurementId}
                        error={listDataValid.measurementId}
                        name='measurement'
                        getData={(e, data) => handleTechniqueChange(e, 'measurementId', data)}/></td>
                    <td>

                        <table className={classes.doubleTable}>
                            <thead>
                            <tr>
                                <th>Кількість</th>
                                <th>Серійний номер</th>
                                <th>Ціна за одиницю</th>
                                <th>Дата створення</th>
                                <th>Категорія</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {listTechnique.detail.map(({
                                                           idDetail,
                                                           serialNumber,
                                                           price,
                                                           categoryId,
                                                           dateOfManufacture
                                                       }, index) => (
                                <tr key={idDetail}>
                                    <td><InputMui
                                        value={listTechnique.detail[index].count}
                                        error={listDataValid.detail[index].count}
                                        errorLabel='Кількість повина бути більше 0'
                                        getData={(e) => handleChangeCount(e, index, 'count')}/></td>
                                    <td><InputMui
                                        value={listTechnique.detail[index].serialNumber}
                                        error={listDataValid.detail[index].serialNumber}
                                        getData={(e) => handleChangeSerialNumber(e, index, 'serialNumber')}/>
                                    </td>
                                    <td><InputMui
                                        value={listTechnique.detail[index].price}
                                        error={listDataValid.detail[index].price}
                                        type='number'
                                        getData={(e) => handleChange(e, index, 'price')}/>

                                    </td>
                                    <td><InputDate
                                        value={listTechnique.detail[index].dateOfManufacture}
                                        error={listDataValid.detail[index].dateOfManufacture}
                                        getData={(e) => handleChange(e, index, 'dateOfManufacture')}/>

                                    </td>
                                    <td><Select
                                        nameSelect="category"
                                        value={listTechnique.detail[index].categoryId}
                                        name='categoryName'
                                        error={listDataValid.detail[index].categoryId}
                                        getData={(e, data) => handleChange(e, index, 'categoryId', data)}/>

                                    </td>
                                    <td>
                                        <IconButton size='small'
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
                        onClick={addInListTeqchnique}>
                <SaveIcon></SaveIcon></IconButton>
        </Box>
    );
});
export default FormDeregistrationNewTechnique;