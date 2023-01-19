import React, {useContext, useEffect, useState} from 'react';
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import FormDocumentRegistration from "../../components/UI/forms/documents/formDocumentRegistration";
import MyModal from "../../components/UI/modal/MyModal";
import TableMoveExecution from "../../components/UI/table/Move/tableMoveExecution";
import FormDocumentConfirm from "../../components/UI/forms/documents/formDocumentConfirm";

import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import classes from "./move.module.css";
import DateNow from "../../components/UI/calendar/dateNow";
import {executionOrder} from "../../http/Documents";
import {toJS} from "mobx";
import MyButton from "../../components/UI/button/MyButton";
import ErrorAddData from "../../components/UI/error/errorAddData";
import FormChangeDocumentTransmission from "../../components/UI/forms/move/formChangeDocumentTransmission";

const MoveConfirmTransmission = observer(() => {
    const {documents} = useContext(Context)
    const [modalTechnique, setModalTechnique] = useState(false)
    const [modalChangeData, setChangeData] = useState(false)
    const [dateConfirm, setDateConfirm] = useState(DateNow())
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => documents.setTypeDocumentComing(data))

    }, [])
    const documentConfim = () => {
        executionOrder(
            {
                orderId: toJS(documents.listOrderNotExecution['id']),
                date: dateConfirm,
                orderScanName: "file",
                documents: toJS(documents.documentConfirm),
                changedTechniques: documents.documentConfirmChangedTechniques
            },
            file,
            documents.documentConfirm
        )
            .catch(data => {
                console.log(data)
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
            }
        })
    }
    console.log(toJS(documents.listOrderNotExecution.length))
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <div className={classes.buttonSave}>
                <MyButton onClick={documentConfim}>Підтвердити передачу</MyButton>
            </div>
            <h1>Підтвердження передачі</h1>
            <div className={classes.tableTechnique}>
                <MyButtonAdd onClick={() => setModalTechnique(true)}>Обрати непідтверджений наряд</MyButtonAdd>
                {/*<TableDocumentConfirm/>*/}
                <TableMoveExecution
                    dateConfirm={dateConfirm}
                    setDateConfirm={setDateConfirm}
                    file={file}
                    setFile={setFile}
                    setChangeData={setChangeData}
                />
            </div>
            {documents.listOrderNotExecution.length === undefined
                &&
                <div className={classes.tableDocument} style={{padding: 20}}>
                    <FormDocumentConfirm/>
                </div>
            }
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormDocumentRegistration
                    setVisible={setModalTechnique}
                    dateConfirm={dateConfirm}
                    setDateConfirm={setDateConfirm}
                    file={file}
                    setFile={setFile}

                />
            </MyModal>
            <MyModal visible={modalChangeData} setVisible={setChangeData}>
                <FormChangeDocumentTransmission visible={modalChangeData} setVisible={setChangeData}/>
            </MyModal>
        </ErrorAddData>
    );
});

export default MoveConfirmTransmission;