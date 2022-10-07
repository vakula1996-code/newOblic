import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import Box from "@mui/material/Box";
import classes from "../table.module.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import StorageIcon from "@mui/icons-material/Storage";
import DeleteIcon from "@mui/icons-material/Delete";
import MyModal from "../../modal/MyModal";
import FormTechniqueChangeDeregistration from "../../forms/deregistration/formTechniqueChangeDeregistration";
import {observer} from "mobx-react-lite";

const TableDeregastrationNewTechnique = observer(({error}) => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    const [idTechnique, setIdTechnique] = useState('')
    const [modalTechniqueChange, setModalTechniqueChange] = useState(false)
    const handleTechniqueRemove = (id) => {
        technique.setListNewTechniqueFromModernization(technique.listNewTechniqueFromModernization.filter(listItem => listItem.id !== id))
        technique.setListNewTechniqueFromModernizationForTable(technique.listNewTechniqueFromModernizationForTable.filter(listItem => listItem.id !== id))
        technique.setListTechniqueValid(technique.listTechniqueValid.filter(listItem => listItem.id !== id))
    }
    const handleSerialNumberRemove = (id, idDetail) => {
        technique.setListNewTechniqueFromModernization(technique.listNewTechniqueFromModernization.map(listItem =>
            listItem.id === id
                ?
                {...listItem, detail: listItem.detail.filter(detailItem => detailItem.idDetail !== idDetail)}
                :
                listItem
        ))
        technique.setListNewTechniqueFromModernizationForTable(technique.listNewTechniqueFromModernizationForTable.map(listItem =>
            listItem.id === id
                ?
                {...listItem, detail: listItem.detail.filter(detailItem => detailItem.idDetail !== idDetail)}
                :
                listItem
        ))
        technique.setListTechniqueValid(technique.listTechniqueValid.map(listItem =>
            listItem.id === id
                ?
                {...listItem, detail: listItem.detail.filter(detailItem => detailItem.idDetail !== idDetail)}
                :
                listItem
        ))
    }


    useEffect(() => {
        if (error === 'Hello world') {
            technique.setListNewTechniqueFromModernizationForTable([])
        }
    }, [error])
    const handleChange = (id) => {
        setIdTechnique(id)
        setModalTechniqueChange(true)
    }
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
                            <th>Найменування</th>
                            <th>Тип</th>
                            <th>Тип забезпечення</th>
                            <th>Одиниця виміру</th>
                            <th>Додаткові дані</th>
                            <th>Дія</th>
                        </tr>
                        </thead>
                        <tbody>
                        {technique.listNewTechniqueFromModernizationForTable.map(({
                                                                                      id,
                                                                                      subdivisionId,
                                                                                      techniqueTypeId,
                                                                                      techniqueName,
                                                                                      measurementId,
                                                                                      detail,
                                                                                      ensuringTypeId
                                                                                  }, indexTechnique) =>
                            <tr key={id}>
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
                                            <h4>Додаткові дані</h4>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <table>
                                                <thead>
                                                <tr>
                                                    <th>Кількість</th>
                                                    <th>Серійний номер</th>
                                                    <th>Ціна за одниницю</th>
                                                    <th>Дата створення</th>
                                                    <th>Категорія</th>
                                                    <th>Дія</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {detail.map(({
                                                                 idDetail,
                                                                 serialNumber,
                                                                 price,
                                                                 categoryId,
                                                                 dateOfManufacture,
                                                                 count
                                                             }) => (
                                                    <tr key={idDetail}>
                                                        <td>{count}</td>

                                                        <td>{serialNumber}</td>
                                                        <td>{price}</td>
                                                        <td>{dateOfManufacture}</td>
                                                        <td>{categoryId}</td>
                                                        <td>
                                                            <IconButton size='small'
                                                                        onClick={() => handleSerialNumberRemove(id, idDetail)}><DeleteIcon></DeleteIcon></IconButton>
                                                        </td>
                                                    </tr>
                                                ))}

                                                </tbody>
                                            </table>
                                        </AccordionDetails>
                                    </Accordion>
                                </td>
                                <td><IconButton size='small'
                                                onClick={() => handleChange(id)}><StorageIcon></StorageIcon></IconButton>

                                    <IconButton size='small'
                                                onClick={() => handleTechniqueRemove(id)}><DeleteIcon></DeleteIcon></IconButton>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                : <h2>Добавте майно в список</h2>

            }
            {idTechnique !== ''
                ?
                < MyModal visible={modalTechniqueChange} setVisible={setModalTechniqueChange}>
                    <FormTechniqueChangeDeregistration setVisible={setModalTechniqueChange}
                                                       idTechnique={idTechnique}/>
                </MyModal>
                : <></>
            }
        </Box>
    );
});

export default TableDeregastrationNewTechnique;