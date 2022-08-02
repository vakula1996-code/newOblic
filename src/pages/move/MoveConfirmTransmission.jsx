import React, {useEffect, useContext, useState} from 'react';
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import FormDocumentRegistration from "../../components/UI/forms/documents/formDocumentRegistration";
import MyModal from "../../components/UI/modal/MyModal";
import TableMoveExecution from "../../components/UI/table/tableMoveExecution";
import FormDocumentConfirm from "../../components/UI/forms/documents/formDocumentConfirm";
import TableDocumentConfirm from "../../components/UI/table/tableDocumentConfirm";
import InputDate from "../../components/UI/input/inputDate";
import {executionOrder} from "../../http/Documents";
import {toJS} from "mobx";

const MoveConfirmTransmission = observer(() => {
    const {document} = useContext(Context)
    const [modalTechnique, setModalTechnique] = useState(false)
    const [modalDocument, setModalDocument] = useState(false)
    const [dateConfirm, setDateConfirm] = useState('')
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(2).then(data=> document.setTypeDocumentComing(data))

    }, [])
    const documentConfim = () => {
      executionOrder({orderId:toJS(document.listOrderNotExecution[0]['id']),date:dateConfirm,documents:toJS(document.documentConfirm)})
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20%'
        }}>
            <button onClick={documentConfim}><h2>Підтвердити передачу</h2><InputDate
                value={dateConfirm}
                getData={(e) => setDateConfirm(e.target.value)}
            />
            </button>
            <button onClick={() => setModalDocument(true)}>Додати документ</button>
            <button onClick={() => setModalTechnique(true)}>Додати зареєстрований наряд</button>
            <MyModal visible={modalDocument} setVisible={setModalDocument}>
                <FormDocumentConfirm/>
            </MyModal>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormDocumentRegistration/>
            </MyModal>
            <TableDocumentConfirm/>
            <TableMoveExecution/>

        </div>
    );
});

export default MoveConfirmTransmission;