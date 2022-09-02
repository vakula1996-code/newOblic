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
import ReadFile from "../../components/hook/file/readFile";

const ComingCharity = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(1).then(data => document.setTypeDocumentComing(data))
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))
        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)

    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const addNewTeqchnique = () => {
        addNewTechniqueHttp(document.document, technique.listTechnique, 'help').catch(data => {
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
            <ReadFile/>
            {/*<h1>Шефська допомога*/}
            {/*</h1>*/}

            {/*<MyModal visible={modalTechnique} setVisible={setModalTechnique}>*/}
            {/*    <FormTechnique setVisible={setModalTechnique}/>*/}
            {/*</MyModal>*/}
            {/*<FormDocument error={error}/>*/}
            {/*<MyButton className={classes.button} onClick={addNewTeqchnique}>Зберегти</MyButton>*/}
            {/*<MyButtonAdd onClick={() => setModalTechnique(true)}>Додати техніку</MyButtonAdd>*/}
            {/*<Table error={error}/>*/}
        </ErrorAddData>

    );
});

export default ComingCharity;