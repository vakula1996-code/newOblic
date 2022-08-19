import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {subdivisionsTechniques} from "../../../../http/Technique";
import {Context} from "../../../../index";
import classes from '../table.module.css'
import MyButtonChoice from "../../button/MyButtonChoice";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const TableMoveChoice = observer(({idSubdivision, setData}) => {
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
    const [listMove, setListMove] = useState([])
    const addInList = (indexTechnique, indexSerialNumber) => {
        technique.setMoveTechnique([...technique.moveTechnique, {
            typeTechnique: dataList[indexTechnique].typeTechnique,
            nameTechniques: dataList[indexTechnique].nameTechniques,
            measurement: dataList[indexTechnique].measurement,
            subdivision: dataList[indexTechnique].subdivision,
            techniqueDetails: dataList[indexTechnique]["techniqueDetails"][indexSerialNumber]

        }])
        technique.setMoveTechniqueId([...technique.moveTechniqueId, {
            techniqueDetailId: dataList[indexTechnique]['techniqueDetails'][indexSerialNumber].id,
            count: dataList[indexTechnique]['techniqueDetails'][indexSerialNumber].count,
            howCategoryId: dataList[indexTechnique]['techniqueDetails'][indexSerialNumber].categoryId
        }])
        const list = [...dataList]
        const listSerialNumber = list[indexTechnique]["techniqueDetails"].splice(indexSerialNumber, 1)
        setListMove(listSerialNumber)
    }

    return (
        <div>
            <h3>Список техніки підрозділу</h3>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
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
                    <th>
                        Детальна інформація
                    </th>
                </tr>
                </thead>
                <tbody>
                {dataList.map(({
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
                                                <tr key={indexSerialNumber}>
                                                    <td>{indexSerialNumber + 1}</td>
                                                    <td>{serialNumber}</td>
                                                    <td>{price}</td>
                                                    <td>{category}</td>
                                                    <td>{count}</td>
                                                    <td>{dateOfManufacture}</td>

                                                    <td>
                                                        <MyButtonChoice
                                                            onClick={() => addInList(indexTechnique, indexSerialNumber)}>Вибрати
                                                        </MyButtonChoice>
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
    );
});

export default TableMoveChoice;