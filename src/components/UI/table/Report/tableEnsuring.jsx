import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import {nameSubdivisions} from "../../../../http/Type";
import {techniqueEnsuring} from "../../../../http/Technique";
import Select from "../../select/select";
import classes from "../table.module.css";
import {observer} from "mobx-react-lite";

const TableEnsuring = observer(() => {
    const {documents} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    const [subdivisionId, setSubdivisionid] = useState()
    const [listEnsuring, setListEnsuring] = useState()
    useEffect(() => {
        if (subdivisionId) {
            techniqueEnsuring(subdivisionId).then(data => setListEnsuring(data))
        }
    }, [subdivisionId])
    return (
        <div>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={subdivisionId}
                    name='subdivisionName'
                    getData={e => setSubdivisionid(e.target.value)}/>
            {listEnsuring
                ? <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Тип забезпечення</th>
                        <th>Необхідна кількість</th>
                        <th>Наявна кількість</th>
                        <th>Забезпечення, %</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listEnsuring.type.map(({
                                                ensuring,
                                                inThePresence,
                                                inTheRow,
                                                name
                                            }, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{name}</td>
                            <td>{inTheRow}</td>
                            <td>{inThePresence}</td>
                            <td>{ensuring}</td>
                        </tr>
                    )}

                    <tr>
                        <td colSpan='5'>Загальна забезпеченість: {listEnsuring.ensuring}%</td>
                    </tr>
                    </tbody>
                </table>

                : <></>
            }
        </div>);
});

export default TableEnsuring;