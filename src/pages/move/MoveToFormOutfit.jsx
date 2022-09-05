import React, {useContext, useEffect, useState} from 'react';
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";
import MyModal from "../../components/UI/modal/MyModal";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TableMoveChoice from "../../components/UI/table/Move/tableMoveСhoice";
import TableLookMove from "../../components/UI/table/Move/tableLookMove";
import {createOrder} from "../../http/Technique";
import MyButton from "../../components/UI/button/MyButton";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import MyButtonNotActivated from "../../components/UI/button/MyButtonNotActivated";
import ErrorAddData from "../../components/UI/error/errorAddData";
import classes from './move.module.css'

const MoveToFormOutfit = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)

    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => document.setTypeDocumentComing(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [idSubdivision, setIdSubdivision] = useState()
    const [listMoveTechnique, setListMoveTechnique] = useState([])
    const [doc, setDoc] = useState()
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const move = () => {
        createOrder({document: doc, techniques: listMoveTechnique}).catch(data => {
            if (data.response.data.detail) {
                setError(data.response.data.detail)
                setErrorMessages(data.response.data.detail)
            } else if (data.response.status === 500) {
                setError('Не опрацьовий запит')
                setErrorMessages('Не опрацьовий запит! Перевірте правельність ведених значень.')
            } else if (data.response.status === 200) {
                console.log(data)
                console.log('OK 200')
            }
        }).then(data => {
            if (data !== undefined) {
                setError(data)
                setErrorMessages(data)
            }
        })
    }
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <h1>Формування наряду</h1>

            <FormDocumentMove id={setIdSubdivision} f={setDoc} error={error}/>
            <MyButton onClick={move}>Сформувати наряд</MyButton>
            {data.length > 0
                ? <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати майно</MyButtonAdd>
                : <MyButtonNotActivated onClick={() => setModalTechnique(true)}>Додати майно</MyButtonNotActivated>
            }
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <div className={classes.blockTable}>
                    <TableMoveChoice idSubdivision={idSubdivision} setData={setData} error={error}/>


                </div>
            </MyModal>
            {listMoveTechnique.length > 0
                ? <TableLookMove list={setListMoveTechnique} error={error}/>
                : <></>
            }

        </ErrorAddData>
    );
});

export default MoveToFormOutfit;