import React, {useEffect,useContext} from 'react';
import {observer} from "mobx-react-lite";
import FormDocument from "../../components/UI/forms/documents/formDocument";
import Table from "../../components/UI/table/table";
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import {
    nameCategory,
    nameDocument,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {Context} from "../../index";
import {addNewTechniqueHttp} from "../../http/Technique";
import classes from "../../components/UI/table/table.module.css";

const ComingPurchase = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(()=>{
        nameSubdivisions().then(data=> document.setTypeNumberSubdivisions(data))
        nameDocument(1).then(data=> document.setTypeDocumentComing(data))
        nameTechniqueType().then(data=> technique.setTypeTechnique(data))
        nameTechnique().then(data=> technique.setNameTechnique(data))
        nameMeasurements().then(data=> technique.setMeasurements(data))
    },[])
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(document.document,technique.listTechnique)
    }
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', marginRight:'10%'}}>
            <h1>Закупка <button className={classes.button} onClick={addNewTeqchnique}>Виконати дію</button></h1>
            <FormDocument/>
            <FormTechnique/>
            <Table/>
        </div>
    );
});

export default ComingPurchase;