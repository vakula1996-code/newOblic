import React, {useEffect, useContext,useState} from 'react';
import FormMoveRegistration from "../../components/UI/forms/documents/formMoveRegistration";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import TableOrderNotRegistration from "../../components/UI/table/tableOrderNotRegistration";
import MyModal from "../../components/UI/modal/MyModal";
import {orderNotRegister} from "../../http/Documents";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import TableForOrderNotRegister from "../../components/UI/table/Move/tableForOrderNotRegister";

const MoveRegistrationOutfit = observer(() => {
    const {document} = useContext(Context)
    const [orderNotRegisterId, setOrderNotRegisterId] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => document.setTypeDocumentComing(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)
    const data = {
        documentNumber: null,
        toSubdivisionId: null,
        date: null
    }
    const [doc, setDoc] = useState(data)
    const [id, setId] = useState('')

    const addDocument = () => {
        orderNotRegister({date:doc.date,toSubdivisionId:doc.toSubdivisionId},id).then(data=>document.setListOrderNotRegister(data))
        setModalTechnique(true)
    }

    return (
        <div>
            <h1>Зареєструвати наряд</h1>
            <FormMoveRegistration setDoc={setDoc} setId={setId} doc={doc} id={id} />
            <MyButtonAdd onClick={addDocument}>Отримати документ</MyButtonAdd>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableOrderNotRegistration setVisible={setModalTechnique} setOrderNotRegisterId={setOrderNotRegisterId}/>
            </MyModal>
            <TableForOrderNotRegister orderNotRegisterId={orderNotRegisterId} doc={doc}/>

        </div>
    );
});

export default MoveRegistrationOutfit;