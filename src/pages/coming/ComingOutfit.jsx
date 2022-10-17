import React, {useContext, useEffect, useState} from 'react';
import FormTechnique from "../../components/UI/forms/documents/formTechnique";
import Table from "../../components/UI/table/table";
import FormDocumentOutfit from "../../components/UI/forms/documents/formDocumentOutfit";
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions, nameSubdivisionsAll,
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
import classesComing from "./coming.module.css";

const ComingOutfit = observer(() => {
    const {documents} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameSubdivisionsAll().then(data => documents.setTypeNumberSubdivisionsAll(data))
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
        if (
            documents.document[0].documentDate !== '' &&
            documents.document[0].documentNameId !== null &&
            documents.document[0].documentNumber !== '' &&
            documents.document[0].documentScanName !== '' &&
            documents.document[0].file !== null &&
            documents.document[0].fromSubdivisionId !== null &&
            documents.document[0].toSubdivisionId !== null &&
            documents.document[0].fromSubdivisionId !== documents.document[0].toSubdivisionId
        ) {
            addNewTechniqueHttp(documents.document, technique.listTechnique, 'order').catch(data => {
                if (data.response.data.detail) {
                    setError(data.response.data.detail)
                    setErrorMessages(data.response.data.detail)
                }
            }).then(data => {
                if (data !== undefined) {
                    setError(data)
                    setErrorMessages(data)
                    window.location.reload()
                }
            })
        } else if (documents.document[0].fromSubdivisionId === documents.document[0].toSubdivisionId &&
            documents.document[0].fromSubdivisionId !== null &&
            documents.document[0].toSubdivisionId !== null) {
            console.log(documents.document[0].toSubdivisionId)
            setError('Відправник та Одержувач не мають співпадати')
            setErrorMessages('Відправник та Одержувач не мають співпадати')
        } else {
            setError('Заповніть всі поля')
            setErrorMessages('Заповніть всі поля')
        }


    }
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <div className={classesComing.buttonSave}>
                <MyButton className={classes.button} onClick={addNewTeqchnique}>Зберегти</MyButton>
            </div>
            <h1>По наряду </h1>
            <div className={classesComing.tableDocument}>
                <FormDocumentOutfit error={error}/>
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

export default ComingOutfit;