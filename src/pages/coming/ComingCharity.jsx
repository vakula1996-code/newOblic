import React, {useContext, useEffect,useState} from 'react';
import FormDocument from "../../components/UI/forms/documents/formDocument";
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import Table from "../../components/UI/table/table";
import {
    nameDocument, nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";

const ComingCharity = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(1).then(data => document.setTypeDocumentComing(data))
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))
        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
    }, [])


    const [modalTechnique, setModalTechnique] = useState(false)


    return (
        <div>
            <h1>Шефська допомога
            </h1>

            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique/>
            </MyModal>

            <FormDocument/>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати техніку</MyButtonAdd>
            <Table type='help'/>
        </div>
    );
});

export default ComingCharity;