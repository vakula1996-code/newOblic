import React, {useContext, useEffect, useState} from 'react';
import Select from "../../components/UI/select/select";
import TableDocumentsAll from "../../components/UI/table/Report/tableDocumentsAll";
import {nameSubdivisions} from "../../http/Type";
import {documentAll} from "../../http/Documents";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const LookDocuments = observer(() => {
    const {documents} = useContext(Context)
    const [idSubdivision, setIdSubdivision] = useState()
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    useEffect(() => {
        if (idSubdivision !== undefined) {
            documentAll(idSubdivision).then(data => {
                setDataList(data);
            })
        }
    }, [idSubdivision])
    return (
        <div>
            <h1 style={{whiteSpace:'nowrap'}}>Перегляд документів</h1>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}
                    name='subdivisionName'
                    getData={e => setIdSubdivision(e.target.value)}/>
            <TableDocumentsAll/>
        </div>
    );
});

export default LookDocuments;