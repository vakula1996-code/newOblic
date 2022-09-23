import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {subdivisionsTechniques} from "../../../../http/Technique";
import {Context} from "../../../../index";
import classes from '../table.module.css'
import MyButtonChoice from "../../button/MyButtonChoice";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyButtonLookFilter from "../../button/MyButtonLookFilter";
import FilterWindow from "../../filter/filterWindow";


const TableMoveChoice = observer(({idSubdivision, setData, error, filterId, setFilterId}) => {
    const {technique} = useContext(Context)
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        if (idSubdivision) {
            subdivisionsTechniques(idSubdivision).then(data => {
                setDataList(data);
                setData(data)
            })
        }
    }, [idSubdivision])
    const addInList = (id) => {
        dataList.filter(dataItem =>
            dataItem.techniqueDetails.filter(detailItem =>
                detailItem.id === id
                    ?
                    technique.setMoveTechnique([...technique.moveTechnique, {
                        id: dataItem.id,
                        typeTechnique: dataItem.typeTechnique,
                        nameTechniques: dataItem.nameTechniques,
                        measurement: dataItem.measurement,
                        subdivision: dataItem.subdivision,
                        techniqueDetails: detailItem
                    }])
                    ||
                    technique.setMoveTechniqueId([...technique.moveTechniqueId, {
                        techniqueDetailId: detailItem.id,
                        count: detailItem.count,
                        howCategoryId: detailItem.categoryId
                    }])
                    ||
                    setFilterId([...filterId, {idTechnique: dataItem.id, idTechniqueDetail: detailItem.id}])
                    :
                    detailItem
            )
        )
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
    useEffect(() => {
        console.log(error)
        if (error === '200') {
            setDataFilter([])
        }
    }, [error])
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
            <h3>Список майна</h3>
            <div className={classes.tableScroll}>
                <table>
                    <thead>
                    <tr>
                        <th>
                            №
                        </th>
                        <th>
                            Тип майна
                        </th>
                        <th>
                            Найменування
                        </th>
                        <th>
                            Одиниця виміру
                        </th>
                        <th style={{zIndex: 9}}>
                            Детальна інформація
                        </th>
                    </tr>
                    <tr>

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
                        techniqueDetails.some(itemDetail => (filterId.map(item => item.idTechniqueDetail).includes(itemDetail.id) === false))
                            ?
                            <tr key={id}>
                                <td>{indexTechnique + 1}</td>
                                <td>{typeTechnique}</td>
                                <td>{nameTechniques}</td>
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
                                                    filterId.map(item => item.idTechniqueDetail).includes(id) === false
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
                                                                    onClick={() => addInList(id)}>Вибрати
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
                            : <></>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default TableMoveChoice;