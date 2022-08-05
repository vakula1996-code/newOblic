import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import FormDocument from "../../components/UI/forms/documents/formDocument";
import Table from "../../components/UI/table/table";
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {Context} from "../../index";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";

const ComingPurchase = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(()=>{
        nameSubdivisions().then(data=> document.setTypeNumberSubdivisions(data))
        nameDocument(2).then(data=> document.setTypeDocumentComing(data))
        nameTechniqueType().then(data=> technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))

        nameTechnique().then(data=> technique.setNameTechnique(data))
        nameMeasurements().then(data=> technique.setMeasurements(data))
    },[])

    const [modalTechnique, setModalTechnique] = useState(false)

    return (
        <div >
            <h1>Закупка </h1>
            <FormDocument/>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique/>
            </MyModal>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати техніку</MyButtonAdd>

            <Table type='doc'/>
        </div>
    );
});

export default ComingPurchase;