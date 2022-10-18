import React from 'react';
import classes from "../table.module.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const TableLookTechnique = ({dataList}) => {

    return (
        dataList.length > 0
            ?
            <div className={classes.tableScroll}>
                <h2>Техніка за підрозділ</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Найменування</th>
                        <th>Тип</th>
                        <th>Додаткові дані</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dataList.map(({techniqueName,techniqueType,techniqueId,details})=>
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
                                            {details.map(({
                                                                       id,
                                                                       serialNumber,
                                                                       price,
                                                                       category,
                                                                       count,
                                                                       dateOfManufacture
                                                                   }, index) =>
                                                    <tr key={index}>
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
            </div>
            :<></>
    );
};

export default TableLookTechnique;