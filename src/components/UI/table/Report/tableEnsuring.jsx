import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../index";
import {nameSubdivisions} from "../../../../http/Type";
import {lookTechnique, techniqueEnsuring} from "../../../../http/Technique";
import Select from "../../input/select";
import classes from "../table.module.css";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

const TableEnsuring = observer(() => {
    const {document} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
    }, [])
    const [subdivisionId, setSubdivisionid] = useState()
    const [listEnsuring, setListEnsuring] = useState()
    useEffect(() => {
        if (subdivisionId) {
            techniqueEnsuring(subdivisionId).then(data => setListEnsuring(data))
        }
    }, [subdivisionId])
    console.log(listEnsuring)
    return (<div>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={subdivisionId}
                    name='subdivisionName'
                    getData={e => setSubdivisionid(e.target.value)}/>
        {listEnsuring
            ?            <table className={classes.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Тип техніки</th>
                    <th>Потреба</th>
                    <th>В наявності</th>

                    <th>Забезпечення</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>АРМ</td>
                    <td>{listEnsuring["АРМ"].inTheRow}</td>
                    <td>{listEnsuring["АРМ"].inThePresence}</td>
                    <td>{listEnsuring["АРМ"].ensuring}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Друкарські пристрої</td>
                    <td>{listEnsuring["Друкарські пристрої"].inTheRow}</td>
                    <td>{listEnsuring["Друкарські пристрої"].inThePresence}</td>
                    <td>{listEnsuring["Друкарські пристрої"].ensuring}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Техніка зв'язку</td>
                    <td>{listEnsuring["Техніка зв'зяку"].inTheRow}</td>
                    <td>{listEnsuring["Техніка зв'зяку"].inThePresence}</td>
                    <td>{listEnsuring["Техніка зв'зяку"].ensuring}</td>
                </tr>
                <tr>
                    <td colSpan='5'>Загальна забезпеченість: {listEnsuring.ensuring}</td>
                </tr>
                </tbody>
            </table>

            :<></>
        }
        </div>);
});

export default TableEnsuring;