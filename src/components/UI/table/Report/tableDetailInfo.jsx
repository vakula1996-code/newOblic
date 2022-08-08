import React, {useEffect,useState} from 'react';
import {techniqueInformation} from "../../../../http/Technique";
import classes from '../table.module.css'

const TableDetailInfo = ({params}) => {
    const [info, setInfo] = useState([])
    useEffect(()=>{
        techniqueInformation(params.subdivisionId, params.id, params.categoryId).then(data => setInfo([data]))
    },[])
    return (
        <div>
            <h2>Детальна інформація</h2>

            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Підрозділ</th>
                    <th>Тип техніки</th>
                    <th>Назва техніки</th>
                    <th>Серійний номер</th>
                    <th>Дата ведення в експлутацію</th>
                    <th>Категорія</th>
                </tr>
                </thead>
                <tbody>
                {
                    info.map(({
                                  subdivision,
                                  typeTechnique,
                                  nameTechnique,
                                  serialNumber,
                                  commissioningDate,
                                  category
                              }, index) =>
                        <tr key={index}>
                            <td>{subdivision}</td>
                            <td>{typeTechnique}</td>
                            <td>{nameTechnique}</td>
                            <td>{serialNumber}</td>
                            <td>{commissioningDate === null
                                ? 'відсутня іформація'
                                : commissioningDate
                            }</td>
                            <td>{category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableDetailInfo;