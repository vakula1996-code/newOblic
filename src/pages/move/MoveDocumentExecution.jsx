import React, {useContext, useEffect, useState} from 'react';
import Select from "../../components/UI/select/select";
import {nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {documentExecution} from "../../http/Documents";

const MoveDocumentExecution = observer(() => {
    const {documents} = useContext(Context)
    const [subdivisionId, setSubdivisionId] = useState()
    const [listDocument, setListDocument] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    useEffect(() => {
        if (subdivisionId) {
            documentExecution(subdivisionId).then(data => setListDocument(data))
        }
    }, [subdivisionId])
    console.log(listDocument)
    return (
        <div>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={subdivisionId}
                    name='subdivisionName'
                    getData={e => setSubdivisionId(e.target.value)}/>
        </div>
    );
});

export default MoveDocumentExecution;