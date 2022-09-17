import React, {useContext, useEffect, useState} from 'react';
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import FormDocumentRegistration from "../../components/UI/forms/documents/formDocumentRegistration";
import MyModal from "../../components/UI/modal/MyModal";
import TableMoveExecution from "../../components/UI/table/Move/tableMoveExecution";
import FormDocumentConfirm from "../../components/UI/forms/documents/formDocumentConfirm";

import MyButtonAdd from "../../components/UI/button/MyButtonAdd";

const MoveConfirmTransmission = observer(() => {
    const {documents} = useContext(Context)
    const [modalTechnique, setModalTechnique] = useState(false)
    const [modalDocument, setModalDocument] = useState(false)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => documents.setTypeDocumentComing(data))

    }, [])

    return (
        <div>
            <h1>Підтвердження передачі</h1>
            <FormDocumentConfirm/>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormDocumentRegistration setVisible={setModalTechnique}/>
            </MyModal>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати зареєстрований наряд</MyButtonAdd>
            {/*<TableDocumentConfirm/>*/}
            <TableMoveExecution/>
        </div>
    );
});

export default MoveConfirmTransmission;