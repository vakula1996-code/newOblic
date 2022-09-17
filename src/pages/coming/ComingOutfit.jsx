import React, {useContext, useEffect, useState} from 'react';
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import Table from "../../components/UI/table/table";
import FormDocumentOutfit from "../../components/UI/forms/documents/formDocumentOutfit";
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import {addNewTechniqueHttp} from "../../http/Technique";
import ErrorAddData from "../../components/UI/error/errorAddData";
import MyButton from "../../components/UI/button/MyButton";
import classes from "../../components/UI/table/table.module.css";

const ComingOutfit = observer(() => {
    const {documents} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(3).then(data => documents.setTypeDocumentComing(data))
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))

        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
    }, [])

    const [modalTechnique, setModalTechnique] = useState(false)

    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(documents.document, technique.listTechnique, 'order').catch(data => {
            if (data.response.data.detail) {
                setError(data.response.data.detail)
                setErrorMessages(data.response.data.detail)
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

            <h1>По наряду </h1>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormTechnique setVisible={setModalTechnique}/>
            </MyModal>

            <FormDocumentOutfit error={error}/>

            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати майно</MyButtonAdd>

            <Table error={error}/>
            <MyButton className={classes.button} onClick={addNewTeqchnique}>Зберегти</MyButton>
        </ErrorAddData>
    );
});

export default ComingOutfit;