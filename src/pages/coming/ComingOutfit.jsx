import React,{useContext, useEffect}  from 'react';
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import Table from "../../components/UI/table/table";
import FormDocumentOutfit from "../../components/UI/forms/documents/formDocumentOutfit";
import {
    nameCategory,
    nameDocument,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import classes from "../../components/UI/table/table.module.css";
import {addNewTechniqueHttp, addNewTechniqueOutfitHttp} from "../../http/Technique";

const ComingOutfit = observer(() => {
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
        addNewTechniqueOutfitHttp(document.document,technique.listTechnique)
    }
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', marginRight:'10%'}}>
            <h1>По наряду <button className={classes.button} onClick={addNewTeqchnique}>Виконати дію</button></h1>
            <FormDocumentOutfit/>
            <FormTechnique/>
            <Table/>
        </div>
    );
});

export default ComingOutfit;