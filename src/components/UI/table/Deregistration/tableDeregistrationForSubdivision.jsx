import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import Select from "../../select/select";
import classes from "../table.module.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Context} from "../../../../index";
import {subdivisionsTechniques} from "../../../../http/Technique";
import MyButtonLookFilter from "../../button/MyButtonLookFilter";
import FilterWindow from "../../filter/filterWindow";
import MyButtonChoice from "../../button/MyButtonChoice";
import {nameSubdivisions} from "../../../../http/Type";
import MyButtonNotActivated from "../../button/MyButtonNotActivated";

const TableDeregistrationForSubdivision = observer(({setVisibleWindow, filterId, setFilterId}) => {
    const {technique} = useContext(Context)
    const {documents} = useContext(Context)
    const [dataList, setDataList] = useState([])
    const [idSubdivision, setIdSubivision] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    useEffect(() => {
        setIdSubivision(idSubdivision)
    }, [idSubdivision])

    useEffect(() => {
        if (idSubdivision.length !== 0) {
            subdivisionsTechniques(idSubdivision).then(data => {
                setDataList(data);
            })
        }
    }, [idSubdivision])
    const [listMove, setListMove] = useState([])
    const addInList = (id) => {

        dataList.filter(dataItem =>
            dataItem.techniqueDetails.filter(detailItem =>
                detailItem.id === id
                    ?
                    technique.setListDeregistrationTechnique([{
                        id: dataItem.id,
                        typeTechnique: dataItem.typeTechnique,
                        nameTechniques: dataItem.nameTechniques,
                        measurement: dataItem.measurement,
                        subdivision: dataItem.subdivision,
                        techniqueDetails: detailItem,
                        typeTechniqueId: dataItem.typeTechniqueId,
                    }])
                    ||
                    technique.setListDeregistrationTechniqueId([...technique.listDeregistrationTechniqueId, {
                        techniqueDetailId: detailItem.id,
                        howCategoryId: detailItem.categoryId,
                        newName: '',
                        newCategoryId: '',
                        newPrice: '',
                    }])
                    ||
                    setFilterId([...filterId, {idTechnique: dataItem.id, idTechniqueDetail: detailItem.id}])
                    :
                    detailItem
            )
        )
        setVisibleWindow(false)

    }
    const [visible, setVisible] = useState(false)
    const hendleVisible = () => {
        if (visible === true) {
            setVisible(false)
        } else {
            setVisible(true)
        }
    }
    const [dataFilter, setDataFilter] = useState([])
    useEffect(() => {
        setDataFilter(dataList)
    }, [dataList])


    return (
        <div>
            <div style={{display: "flex"}}>
                <MyButtonLookFilter onClick={hendleVisible}>Пошук</MyButtonLookFilter>
            </div>
            <FilterWindow
                visible={visible}
                setVisible={setVisible}
                dataList={dataList}
                dataFilter={dataFilter}
                setDataFilter={setDataFilter}
            />
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}
                    name='subdivisionName'
                    getData={e => setIdSubivision(e.target.value)}/>

            <div className={classes.tableScroll}>


                <table>
                    <thead>
                    <tr>
                        <th>
                            №
                        </th>
                        <th>
                            Тип
                        </th>
                        <th>
                            Найменування
                        </th>

                        <th>
                            Підрозділ де знаходиться
                        </th>
                        <th>
                            Одиниця виміру
                        </th>
                        <th style={{zIndex: 9}}>
                            Додаткові дані
                        </th>
                    </tr>

                    </thead>
                    <tbody>
                    {dataFilter.map(({
                                         id,
                                         typeTechnique,
                                         nameTechniques,
                                         measurement,
                                         subdivision,
                                         techniqueDetails,

                                     }, indexTechnique) =>
                        techniqueDetails.length > 0
                            ?
                            <tr key={indexTechnique}>
                                <td>{indexTechnique + 1}</td>
                                <td>{typeTechnique}</td>
                                <td>{nameTechniques}</td>
                                <td>{subdivision}</td>
                                <td>{measurement}</td>
                                <td>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <h4>Додаткові дані</h4>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <table className={classes.table}>
                                                <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Серійний номер</th>
                                                    <th>Ціна за одиницю</th>
                                                    <th>Категорія</th>
                                                    <th>Кількість</th>
                                                    <th>Доступно</th>
                                                    <th>Дата створення</th>
                                                    <th>Дія</th>
                                                    {techniqueDetails['serialNumber'] === 'Б/Н'
                                                        ? <th>Кількість яку передати</th>
                                                        : <></>
                                                    }
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {techniqueDetails.map(({
                                                                           id,
                                                                           serialNumber,
                                                                           price,
                                                                           category,
                                                                           count,
                                                                           available,
                                                                           dateOfManufacture
                                                                       }, indexSerialNumber) =>
                                                    <tr key={indexSerialNumber}>
                                                        <td>{indexSerialNumber + 1}</td>
                                                        <td>{serialNumber}</td>
                                                        <td>{price}</td>
                                                        <td>{category}</td>
                                                        <td>{count}</td>
                                                        <td>{available}</td>
                                                        <td>{dateOfManufacture}</td>
                                                        <td>
                                                            {available > 0
                                                                ? <MyButtonChoice
                                                                    onClick={() => addInList(id)}>Вибрати
                                                                </MyButtonChoice>
                                                                : <MyButtonNotActivated
                                                                    style={{padding: '8px 16px'}}
                                                                    onClick={() => addInList(id)}>Вибрати
                                                                </MyButtonNotActivated>
                                                            }
                                                        </td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>
                                        </AccordionDetails>
                                    </Accordion>
                                </td>
                            </tr>
                            : <></>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default TableDeregistrationForSubdivision;