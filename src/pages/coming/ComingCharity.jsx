import React, {useContext, useEffect, useState} from 'react';
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {addNewTechniqueHttp} from "../../http/Technique";
import ErrorAddData from "../../components/UI/error/errorAddData";
import MyModal from "../../components/UI/modal/MyModal";
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import FormDocument from "../../components/UI/forms/documents/formDocument";
import MyButton from "../../components/UI/button/MyButton";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import classesComing from './coming.module.css'
import Table from "../../components/UI/table/table";
import FormDocumentCharityPurchase from "../../components/UI/forms/coming/formDocumentCharityPurchase";

const ComingCharity = observer(() => {
    const {documents} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(1).then(data => documents.setTypeDocumentComing(data))
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))
        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)

    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(documents.document, technique.listTechnique, 'help').catch(data => {
            if (data.response.data.detail) {
                setError(data.response.data.detail)
                setErrorMessages(data.response.data.detail)
            } else if (data.response.status === 200) {
                console.log(data)
            }
        }).then(data => {
            if (data !== undefined) {
                setError(data)
                setErrorMessages(data)
                window.location.reload()
            }
        })

    }

    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <div className={classesComing.buttonSave}>
                <MyButton onClick={addNewTeqchnique}>Зберегти</MyButton>
            </div>
            <h1>Шефська допомога</h1>
            <div className={classesComing.tableDocument}>
                <FormDocumentCharityPurchase error={error}/>
            </div>
            <div className={classesComing.tableTechnique}>
                <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати майно</MyButtonAdd>
                <Table error={error}/>
            </div>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique setVisible={setModalTechnique}/>
            </MyModal>
        </ErrorAddData>

    );
});

export default ComingCharity;