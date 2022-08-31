import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import Box from "@mui/material/Box";
import classes from "../table.module.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyButtonRemove from "../../button/MyButtonRemove";

const TableDeregastrationNewTechnique = ({error}) => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    const handleTechniqueRemove = (index) => {
        const list = [...technique.listNewTechniqueFromModernization]
        list.splice(index, 1)
        technique.setListNewTechniqueFromModernization(list)


        const listForTable = [...technique.listNewTechniqueFromModernizationForTable]
        listForTable.splice(index, 1)
        technique.setListNewTechniqueFromModernizationForTable(listForTable)

        const l = [...listTechnique]
        l.splice(index, 1)
        setListTechnique(l)
    }
    const handleSerialNumberRemove = (indexSerialNumber, indexTechnique) => {
        const list = [...technique.listNewTechniqueFromModernization]
        list[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListNewTechniqueFromModernization(list)

        const listForTable = [...technique.listNewTechniqueFromModernizationForTable]
        listForTable[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListNewTechniqueFromModernizationForTable(listForTable)

        const l = [...listTechnique]
        l[indexTechnique]['details'].splice(indexSerialNumber, 1)
        setListTechnique(l)
    }
    useEffect(() => {
        if (error === 'Hello world') {
            technique.setListNewTechniqueFromModernizationForTable([])
        }
    }, [error])
    const [listTechnique, setListTechnique] = useState([])
    useEffect(() => {
        setListTechnique(technique.listNewTechniqueFromModernizationForTable)
    }, [])
    return (
        <Box className={classes.containerTable}>
            {technique.listNewTechniqueFromModernizationForTable.length > 0
                ?
                <div>
                    <table className={classes.table}>
                        <caption><h2>Список техніки</h2></caption>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Підрозділ</th>
                            <th>Назва</th>
                            <th>Тип</th>
                            <th>Тип забезпечення</th>
                            <th>Одиниці виміру</th>
                            <th>Детальні данні</th>
                            <th>Дія</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listTechnique.map(({
                                                subdivisionId,
                                                techniqueTypeId,
                                                techniqueName,
                                                measurementId,
                                                details,
                                                ensuringTypeId
                                            }, indexTechnique) =>
                            <tr key={indexTechnique}>
                                <td>{indexTechnique + 1}</td>
                                <td>{subdivisionId}</td>
                                <td>{techniqueName}</td>
                                <td>{techniqueTypeId}</td>
                                <td>{ensuringTypeId}</td>
                                <td>{measurementId}</td>
                                <td>
                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            <h4>Детальні данні</h4>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Кількість</th>
                                                    <th>Серійний номер</th>
                                                    <th>Ціна</th>
                                                    <th>Дата створення</th>
                                                    <th>Категорія</th>
                                                    <th>Дія</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {details.map(({
                                                                  serialNumber,
                                                                  price,
                                                                  categoryId,
                                                                  dateOfManufacture,
                                                                  count
                                                              }, indexSerialNumber) => (
                                                    <tr key={indexSerialNumber}>
                                                        <td>{count}</td>

                                                        <td>{serialNumber}</td>
                                                        <td>{price}</td>
                                                        <td>{dateOfManufacture}</td>
                                                        <td>{categoryId}</td>
                                                        <td><MyButtonRemove
                                                            onClick={() => handleSerialNumberRemove(indexSerialNumber, indexTechnique)}>Видалити</MyButtonRemove>
                                                        </td>
                                                    </tr>
                                                ))}

                                                </tbody>
                                            </table>
                                        </AccordionDetails>
                                    </Accordion>
                                </td>
                                <td><MyButtonRemove
                                    onClick={() => handleTechniqueRemove(indexTechnique)}>Видалити</MyButtonRemove>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                : <h2>Добавте техніку в сиписок</h2>

            }
        </Box>
    );
};

export default TableDeregastrationNewTechnique;