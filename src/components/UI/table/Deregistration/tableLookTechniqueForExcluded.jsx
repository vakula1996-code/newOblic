import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import {nameSubdivisions} from "../../../../http/Type";
import {subdivisionsTechniques} from "../../../../http/Technique";
import Select from "../../select/select";
import classes from "../table.module.css";
import MyButtonLookFilter from "../../button/MyButtonLookFilter";
import FilterWindow from "../../filter/filterWindow";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyButtonChoice from "../../button/MyButtonChoice";
import {observer} from "mobx-react-lite";


const TableLookTechniqueForExcluded = observer(({dataList,filterIdExcluded, setFilterIdExcluded, idSubdivision}) => {
    const {technique} = useContext(Context)
    const addInList = (id) => {
        dataList.filter(dataItem =>
            dataItem.techniqueDetails.filter(detailItem =>
                detailItem.id === id
                    ?
                    technique.setListTechniqueForExcluded([...technique.listTechniqueForExcluded, {
                        id: dataItem.id,
                        typeTechnique: dataItem.typeTechnique,
                        nameTechniques: dataItem.nameTechniques,
                        measurement: dataItem.measurement,
                        subdivision: dataItem.subdivision,
                        techniqueDetails: detailItem
                    }])
                    ||
                    technique.setListTechniqueForExcludeId([...technique.listTechniqueForExcludedId, {
                        techniqueDetailId: detailItem.id,
                        count: detailItem.count,
                        howCategoryId: detailItem.categoryId,
                        subdivisionId: idSubdivision
                    }])
                    ||
                    setFilterIdExcluded([...filterIdExcluded, {idTechnique: dataItem.id, idTechniqueDetail: detailItem.id}])
                    :
                    detailItem
            )
        )
    }
    console.log(dataList)

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

            <div className={classes.tableScroll}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            <MyButtonLookFilter onClick={hendleVisible}/>
                            №
                        </th>
                        <th>
                            Тип техніки
                        </th>
                        <th>
                            Назва техніки
                        </th>

                        <th>
                            Підрозділ де знаходиться
                        </th>
                        <th>
                            Одиниці виміру
                        </th>
                        <th style={{zIndex: '999'}}>
                            Детальна інформація
                        </th>
                    </tr>
                    <tr>
                        <FilterWindow
                            visible={visible}
                            setVisible={setVisible}
                            dataList={dataList}
                            dataFilter={dataFilter}
                            setDataFilter={setDataFilter}
                        />
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

                            <tr key={id}>
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
                                            <h4>Детальні данні</h4>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <table className={classes.table}>
                                                <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Серійний номер</th>
                                                    <th>Ціна</th>
                                                    <th>Категорія</th>
                                                    <th>Кількість</th>
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
                                                                           dateOfManufacture
                                                                       }, indexSerialNumber) =>
                                                    filterIdExcluded.map(item => item.idTechniqueDetail).includes(id) === false
                                                        ?
                                                    <tr key={indexSerialNumber}>
                                                        <td>{indexSerialNumber + 1}</td>
                                                        <td>{serialNumber}</td>
                                                        <td>{price}</td>
                                                        <td>{category}</td>
                                                        <td>{count}</td>
                                                        <td>{dateOfManufacture}</td>

                                                        <td>
                                                            <MyButtonChoice
                                                                onClick={(e) => addInList(id)}>Вибрати
                                                            </MyButtonChoice>
                                                        </td>
                                                    </tr>
                                                        : <></>

                                                )}
                                                </tbody>
                                            </table>
                                        </AccordionDetails>
                                    </Accordion>
                                </td>
                            </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default TableLookTechniqueForExcluded;