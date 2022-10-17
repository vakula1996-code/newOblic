import React from 'react';
import classes from "../table.module.css";
import MyButtonChoice from "../../button/MyButtonChoice";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TableChooseDocumentExecution = ({documentsList,setDocumentsList}) => {
    return (
        <div className={classes.tableScroll}>
            <table>
                <thead>
                <tr>
                    <th>Назва документа</th>
                    <th style={{width:'max-content'}}>Дата документа</th>
                    <th>Майно</th>
                </tr>
                </thead>
                <tbody>
                {documentsList.map(({id, documentName, date,techniques}) =>
                    <tr key={id}>
                        <td>{documentName}</td>
                        <td>{date}</td>

                        <td>
                            <table className={classes.tableSecond}>
                                <thead>
                                <tr>
                                    <th>Назва техніки</th>
                                    <th>Тип техніки</th>
                                    <th style={{zIndex: 5}}>
                                        Детальна інформація
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {techniques.map(({techniqueId, techniqueName, techniqueType, details}) =>
                                    <tr key={techniqueId}>
                                        <td>{techniqueName}</td>
                                        <td>{techniqueType}</td>
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
                                                            <th>Серійний номер</th>
                                                            <th>Ціна за одиницю</th>
                                                            <th>Категорія</th>
                                                            <th>Кількість</th>
                                                            <th>Дата створення</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {details.map(({serialNumber,price,category,count,dateOfManufacture})=>
                                                            <tr>
                                                                <td>{serialNumber}</td>
                                                                <td>{price}</td>
                                                                <td>{category}</td>
                                                                <td>{count}</td>
                                                                <td>{dateOfManufacture}</td>
                                                            </tr>
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
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default TableChooseDocumentExecution;