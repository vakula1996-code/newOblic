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

    const handleTechniqueRemove = (index) => {
        const list = [...technique.listTechnique]
        list.splice(index, 1)
        technique.setListTechnique(list)

        const listForTable = [...technique.listTechniqueForTable]
        listForTable.splice(index, 1)
        technique.setListTechniqueForTable(listForTable)

    }
    const handleSerialNumberRemove = (indexSerialNumber, indexTechnique) => {
        const list = [...technique.listTechnique]
        list[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListTechnique(list)

        const listForTable = [...technique.listTechniqueForTable]
        listForTable[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListTechniqueForTable(listForTable)
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
                <div>
                    <table className={classes.table}>
                        <caption><h2>Список техніки</h2></caption>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Назва</th>
                            <th>Тип</th>
                            <th>Тип забезпечення</th>
                            <th>Одиниці виміру</th>
                            <th>Детальні данні</th>
                            <th>Дія</th>
                        </tr>
                        </thead>
                        <tbody>
                        {technique.listTechniqueForTable.map(({
                                                                  techniqueTypeId,
                                                                  techniqueName,
                                                                  measurementId,
                                                                  details,
                                                                  ensuringTypeId
                                                              }, indexTechnique) =>
                            <tr key={indexTechnique}>
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
                                                        <td>
                                                            <IconButton size='small'
                                                                        onClick={() => handleSerialNumberRemove(indexSerialNumber, indexTechnique)}><DeleteIcon>
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
                                                onClick={() => handleChange(indexTechnique)}><StorageIcon></StorageIcon></IconButton>

                                    <IconButton size='small'
                                                onClick={() => handleTechniqueRemove(indexTechnique)}><DeleteIcon></DeleteIcon></IconButton>
                                </td>

                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                : <h2>Добавте майно до списку</h2>

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