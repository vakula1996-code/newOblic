import React, {useContext, useEffect, useState} from 'react';
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import Table from "../../components/UI/table/table";
import FormDocumentOutfit from "../../components/UI/forms/documents/formDocumentOutfit";
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";

const ComingOutfit = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(()=>{
        nameSubdivisions().then(data=> document.setTypeNumberSubdivisions(data))
        nameDocument(3).then(data=> document.setTypeDocumentComing(data))
        nameTechniqueType().then(data=> technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))

        nameTechnique().then(data=> technique.setNameTechnique(data))
        nameMeasurements().then(data=> technique.setMeasurements(data))
    },[])

    const [modalTechnique, setModalTechnique] = useState(false)

    return (
        <div>
            <h1>По наряду </h1>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique/>
            </MyModal>

            <FormDocumentOutfit/>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати техніку</MyButtonAdd>

            <Table type='order'/>
        </div>
    );
});

export default ComingOutfit;