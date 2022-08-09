import React, {useContext} from 'react';
import classes from "./table.module.css";
import Box from "@mui/material/Box";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import MyButtonRemove from "../button/MyButtonRemove";
import MyButton from "../button/MyButton";
import {addNewTechniqueHttp} from "../../../http/Technique";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Table = observer(({type}) => {
    const {document} = useContext(Context)

    const {technique} = useContext(Context)

    const  handleTechniqueRemove = (index) =>{
        const list = [...technique.listTechnique]
        list.splice(index, 1)
        technique.setListTechnique(list)

        const listForTable = [...technique.listTechniqueForTable]
        listForTable.splice(index, 1)
        technique.setListTechniqueForTable(listForTable)

    }
    const handleSerialNumberRemove = (indexSerialNumber,indexTechnique) => {
        const list = [...technique.listTechnique]
        list[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListTechnique(list)

        const listForTable = [...technique.listTechniqueForTable]
        listForTable[indexTechnique]['details'].splice(indexSerialNumber, 1)
        technique.setListTechniqueForTable(listForTable)
    }
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(document.document,technique.listTechnique,type)
    }
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
                        {technique.listTechniqueForTable.map(({techniqueTypeId,techniqueName,measurementId,details,ensuringTypeId},indexTechnique)=>
                            <tr key={indexTechnique}>
                                <td >{indexTechnique+1}</td>
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
                                            {details.map(({serialNumber, price, categoryId, dateOfManufacture,count}, indexSerialNumber) => (
                                                <tr key={indexSerialNumber}>
                                                    <td>{count}</td>

                                                    <td>{serialNumber}</td>
                                                    <td>{price}</td>
                                                    <td>{dateOfManufacture}</td>
                                                    <td>{categoryId}</td>
                                                    <td><MyButtonRemove onClick={()=>handleSerialNumberRemove(indexSerialNumber,indexTechnique)}>Видалити</MyButtonRemove></td>
                                                </tr>
                                            ))}

                                            </tbody>
                                        </table>
                                    </AccordionDetails>
                                </Accordion>
                                </td>
                                <td><MyButtonRemove onClick={()=>handleTechniqueRemove(indexTechnique)}>Видалити</MyButtonRemove></td>

                            </tr>
                        )}
                        </tbody>
                    </table>
                    <MyButton className={classes.button} onClick={addNewTeqchnique}>Зберегти</MyButton>
                </div>

                :<h2>Добавте техніку в сиписок</h2>

            }
        </Box>
    );
});

export default Table;