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
import classes from "./move.module.css";

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
            <div className={classes.buttonSave}>
                <MyButton onClick={register}>Зареєструвати наряд</MyButton>
            </div>
            <h1>Реєстрація наряду</h1>
            <div className={classes.tableDocument}>
                <FormMoveRegistration setDoc={setDoc} setId={setId} doc={doc} id={id}/>
            </div>
            <div className={classes.tableTechnique}>
                <MyButtonAdd onClick={addDocument}>Обрати наряд</MyButtonAdd>
                <TableForOrderNotRegister orderNotRegisterId={orderNotRegisterId}
                                          setOrderNotRegisterId={setOrderNotRegisterId} doc={doc}/>
            </div>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableOrderNotRegistration setVisible={setModalTechnique}
                                           setOrderNotRegisterId={setOrderNotRegisterId}/>
            </MyModal>
        </ErrorAddData>
    );
});

export default MoveRegistrationOutfit;