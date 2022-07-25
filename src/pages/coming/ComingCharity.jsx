import React, {useContext, useEffect} from 'react';
import FormDocument from "../../components/UI/forms/documents/formDocument";
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import Table from "../../components/UI/table/table";
import {
    nameDocument,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import classes from "../../components/UI/table/table.module.css";
import {toJS} from "mobx";
import {addNewTechniqueHttp} from "../../http/Technique";

const ComingCharity = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(1).then(data => document.setTypeDocumentComing(data))
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
    }, [])

    const addNewTeqchnique = () => {
        addNewTechniqueHttp(document.document,technique.listTechnique)
    }
    

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '10%'
        }}>
            <h1>Шефська допомога <button className={classes.button} onClick={addNewTeqchnique}>Виконати дію</button>
            </h1>
            <FormDocument/>
            <FormTechnique/>
            <Table/>
        </div>
    );
});

export default ComingCharity;