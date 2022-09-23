import React, {useContext, useEffect, useState} from 'react';
import FormMoveRegistration from "../../components/UI/forms/documents/formMoveRegistration";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import TableOrderNotRegistration from "../../components/UI/table/tableOrderNotRegistration";
import MyModal from "../../components/UI/modal/MyModal";
import {orderNotRegister, registerOrder} from "../../http/Documents";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import TableForOrderNotRegister from "../../components/UI/table/Move/tableForOrderNotRegister";
import MyButton from "../../components/UI/button/MyButton";
import ErrorAddData from "../../components/UI/error/errorAddData";

const MoveRegistrationOutfit = observer(() => {
    const {documents} = useContext(Context)
    const [orderNotRegisterId, setOrderNotRegisterId] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => documents.setTypeDocumentComing(data))
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
        orderNotRegister({
            date: doc.date,
            toSubdivisionId: doc.toSubdivisionId
        }, id).then(data => documents.setListOrderNotRegister(data))
        setModalTechnique(true)
    }

    const [errorMessages, setErrorMessages] = useState('')
    const [error, setError] = useState('')
    const register = () => {
        if (documents.listOrderNotRegister[0] !== undefined) {
            registerOrder({
                documentNumber: doc.documentNumber,
                orderId: documents.listOrderNotRegister[0]['id']
            }).catch(data => {
                if (data.response.data.detail) {
                    setError(data.response.data.detail)
                    setErrorMessages(data.response.data.detail)
                } else if (data.response.status === 500) {
                    setError('Не опрацьовий запит')
                    setErrorMessages('Не опрацьовий запит! Перевірте правельність ведених значень.')
                }
            }).then(data => {
                if (data !== undefined) {
                    window.location.reload()
                    setError(data)
                    setErrorMessages(data)
                    setDoc(data)
                    documents.setListOrderNotRegister([])
                }
            })
        } else {
            setError('Не опрацьовий запит')
            setErrorMessages('Добавте документ')
        }
    }

    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <h1>Реєстрація наряду</h1>
            <FormMoveRegistration setDoc={setDoc} setId={setId} doc={doc} id={id}/>
            <MyButton onClick={register}>Зареєструвати наряд</MyButton>
            <MyButtonAdd onClick={addDocument}>Вибрати наряд</MyButtonAdd>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableOrderNotRegistration setVisible={setModalTechnique}
                                           setOrderNotRegisterId={setOrderNotRegisterId}/>
            </MyModal>
            <TableForOrderNotRegister orderNotRegisterId={orderNotRegisterId}
                                      setOrderNotRegisterId={setOrderNotRegisterId} doc={doc}/>

        </ErrorAddData>
    );
});

export default MoveRegistrationOutfit;