import React from 'react';
import classes from './table.module.css'

const TableNameDocument = ({data, name}) => {
    console.log(data[0][name])
    return (
        <div>
            <h3>Назви документів</h3>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Назва</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map((data,index,{id}) =>
                        <tr key={id}>
                            <td>{index+1}</td>
                            <td>{data[name]}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableNameDocument;