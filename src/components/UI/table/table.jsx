import React, {useContext, useEffect, useState} from 'react';
import classes from "./table.module.css";
import Box from "@mui/material/Box";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import StorageIcon from "@mui/icons-material/Storage";
import MyModal from "../modal/MyModal";
import FormTechniqueChange from "../forms/documents/formTechniqueChange";


const Table = observer(({error}) => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    const [idTechnique, setIdTechnique] = useState('')
    const [modalTechniqueChange, setModalTechniqueChange] = useState(false)

    const handleTechniqueRemove = (id) => {
        technique.setListTechnique(technique.listTechnique.filter(listItem => listItem.id !== id))
        technique.setListTechniqueForTable(technique.listTechniqueForTable.filter(listItem => listItem.id !== id))
        technique.setListTechniqueValid(technique.listTechniqueValid.filter(listItem => listItem.id !== id))
    }
    const handleSerialNumberRemove = (id, idDetail) => {
        technique.setListTechnique(technique.listTechnique.map(listItem =>
            listItem.id === id
                ?
                {...listItem, details: listItem.details.filter(detailItem => detailItem.idDetail !== idDetail)}
                :
                listItem
        ))
        technique.setListTechniqueForTable(technique.listTechniqueForTable.map(listItem =>
            listItem.id === id
                ?
                {...listItem, details: listItem.details.filter(detailItem => detailItem.idDetail !== idDetail)}
                :
                listItem
        ))
        technique.setListTechniqueValid(technique.listTechniqueValid.map(listItem =>
            listItem.id === id
                ?
                {...listItem, details: listItem.details.filter(detailItem => detailItem.idDetail !== idDetail)}
                :
                listItem
        ))
    }


    const handleChange = (id) => {
        setIdTechnique(id)
        setModalTechniqueChange(true)
    }

    useEffect(() => {
        if (error === 'Hello world') {
            technique.setListTechniqueForTable([])
        }
    }, [error])
    return (
        <Box className={classes.containerTable}>
            {technique.listTechniqueForTable.length > 0
                ?
                <div className={classes.tableScroll}>
                    <table>
                        <caption><h2>Майно</h2></caption>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Найменування</th>
                            <th>Тип</th>
                            <th>Тип забезпечення</th>
                            <th>Одиниця виміру</th>
                            <th>Додаткові дані</th>
                            <th>Дія</th>
                        </tr>
                        </thead>
                        <tbody>
                        {technique.listTechniqueForTable.map(({
                                                                  id,
                                                                  techniqueTypeId,
                                                                  techniqueName,
                                                                  measurementId,
                                                                  details,
                                                                  ensuringTypeId
                                                              }, indexTechnique) =>
                            <tr key={id}>
                                <td>{indexTechnique + 1}</td>
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
                                            <table style={{width: '100%'}}>
                                                <thead>
                                                <tr>
                                                    <th>Кількість</th>
                                                    <th>Серійний номер</th>
                                                    <th>Ціна за одиницю</th>
                                                    <th>Дата створення</th>
                                                    <th>Категорія</th>
                                                    <th>Дія</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {details.map(({
                                                                  idDetail,
                                                                  serialNumber,
                                                                  price,
                                                                  categoryId,
                                                                  dateOfManufacture,
                                                                  count
                                                              }, indexSerialNumber) => (
                                                    <tr key={idDetail}>
                                                        <td>{count}</td>

                                                        <td>{serialNumber}</td>
                                                        <td>{price}</td>
                                                        <td>{dateOfManufacture}</td>
                                                        <td>{categoryId}</td>
                                                        <td>
                                                            <IconButton size='small'
                                                                        onClick={() => handleSerialNumberRemove(id, idDetail)}><DeleteIcon>
                                                            </DeleteIcon>
                                                            </IconButton>
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

                : <h2>Додайте майно до списку</h2>

            }
            {idTechnique !== ''
                ?
                < MyModal visible={modalTechniqueChange} setVisible={setModalTechniqueChange}>
                    <FormTechniqueChange setVisible={setModalTechniqueChange}
                                         idTechnique={idTechnique}/>
                </MyModal>
                : <></>
            }
        </Box>
    );
});

export default Table;