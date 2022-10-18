import React from 'react';
import classes from '../table.module.css'

const TableLookOrders = ({dataList=[]}) => {
    return (
        <div className={classes.tableShow}>
            <table>
                <thead>
                    <tr>
                        <th>Назва документа</th>
                        <th>Реєстраційний  номер</th>
                        <th>Відправник</th>
                        <th>Одержувач</th>
                        <th>Документ</th>
                    </tr>
                </thead>
                <tbody>
                {dataList.map(({documentId,fromSubdivision,toSubdivision,nameDocument,numberDocument,scan,doc})=>
                    <tr key={documentId}>
                        <td>{nameDocument}</td>
                        <td>{numberDocument}</td>
                        <td>{fromSubdivision}</td>
                        <td>{toSubdivision}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableLookOrders;