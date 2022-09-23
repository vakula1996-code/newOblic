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
import classes from './coming.module.css'
import Table from "../../components/UI/table/table";

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
            {/*<ReadFile/>*/}
            <h1>Шефська допомога
            </h1>

            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique setVisible={setModalTechnique}/>
            </MyModal>
            <FormDocument error={error}/>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати техніку</MyButtonAdd>
            <Table error={error}/>
            <MyButton className={classes.button} onClick={addNewTeqchnique}>Зберегти</MyButton>

        </ErrorAddData>

    );
});

export default ComingCharity;