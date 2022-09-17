import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import FormDocument from "../../components/UI/forms/documents/formDocument";
import Table from "../../components/UI/table/table";
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {Context} from "../../index";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import {addNewTechniqueHttp} from "../../http/Technique";
import ErrorAddData from "../../components/UI/error/errorAddData";
import MyButton from "../../components/UI/button/MyButton";
import classes from "../../components/UI/table/table.module.css";

const ComingPurchase = observer(() => {
    const {documents} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(2).then(data => documents.setTypeDocumentComing(data))
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))

        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
    }, [])

    const [modalTechnique, setModalTechnique] = useState(false)

    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(documents.document, technique.listTechnique, 'doc').catch(data => {
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
            }
        })
    }
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <h1>Закупка </h1>
            <FormDocument error={error}/>

            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique setVisible={setModalTechnique}/>
            </MyModal>

            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати майно</MyButtonAdd>
            <Table error={error}/>
            <MyButton className={classes.button} onClick={addNewTeqchnique}>Зберегти</MyButton>
        </ErrorAddData>
    );
});

export default ComingPurchase;