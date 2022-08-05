import React, {useEffect, useContext, useState} from 'react';
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import FormDocumentRegistration from "../../components/UI/forms/documents/formDocumentRegistration";
import MyModal from "../../components/UI/modal/MyModal";
import TableMoveExecution from "../../components/UI/table/Move/tableMoveExecution";
import FormDocumentConfirm from "../../components/UI/forms/documents/formDocumentConfirm";
import TableDocumentConfirm from "../../components/UI/table/tableDocumentConfirm";

import MyButtonAdd from "../../components/UI/button/MyButtonAdd";

const MoveConfirmTransmission = observer(() => {
    const {document} = useContext(Context)
    const [modalTechnique, setModalTechnique] = useState(false)
    const [modalDocument, setModalDocument] = useState(false)
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data=> document.setTypeDocumentComing(data))

    }, [])

    return (
        <div >
            <h1>Підтвердити передачу</h1>
            <MyButtonAdd style={{margin:'5px'}} onClick={() => setModalDocument(true)}>Додати документ</MyButtonAdd>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати зареєстрований наряд</MyButtonAdd>
            <MyModal visible={modalDocument} setVisible={setModalDocument}>
                <FormDocumentConfirm/>
            </MyModal>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormDocumentRegistration  setVisible={setModalTechnique}/>
            </MyModal>
            <TableDocumentConfirm/>
            <TableMoveExecution/>
        </div>
    );
});

export default MoveConfirmTransmission;