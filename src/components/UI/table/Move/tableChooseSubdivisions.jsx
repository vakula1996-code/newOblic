import React,{useContext, useEffect, useState} from 'react';
import Select from "../../select/select";
import {Context} from "../../../../index";
import {nameSubdivisions} from "../../../../http/Type";
import {documentExecution} from "../../../../http/Documents";
import {observer} from "mobx-react-lite";
import classes from '../table.module.css'

const TableChooseSubdivisions = observer(() => {
    const {documents} = useContext(Context)
    const [fromSubdivisionId, setFromSubdivisionId] = useState()
    const [toSubdivisionId, setToSubdivisionId] = useState()
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    useEffect(() => {
        if (toSubdivisionId) {
            documentExecution(fromSubdivisionId, {toSubdivisionId}).then(data => documents.setDocumentExecutionList(data))
        }
    }, [toSubdivisionId])
    return (
        <table className={classes.tableShow}>
            <thead>
            <tr>
                <th>Підрозділ з якого</th>
                <th>Підрозділ в який</th>
            </tr>
            </thead>
            <tr>
                <td style={{backgroundColor:'white'}}>
                    <Select label="Підрозділ" nameSelect="numberSubdivisions" value={fromSubdivisionId}
                            name='subdivisionName'
                            getData={e => setFromSubdivisionId(e.target.value)}/>
                </td>
                <td style={{backgroundColor:'white'}}>
                    <Select label="Підрозділ" nameSelect="numberSubdivisions" value={toSubdivisionId}
                            name='subdivisionName'
                            getData={e => setToSubdivisionId(e.target.value)}/>
                </td>
            </tr>
            <tbody>

            </tbody>
        </table>
    );
});

export default TableChooseSubdivisions;