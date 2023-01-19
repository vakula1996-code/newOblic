import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import TableChooseSubdivisions from "../../components/UI/table/Move/tableChooseSubdivisions";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import classesComing from "../move/move.module.css";
import TableLookDocumentExecution from "../../components/UI/table/Move/tableLookDocumentExecution";
import {documentCancel} from "../../http/Documents";
import {Context} from "../../index";
import TableChooseDocumentExecution from "../../components/UI/table/Move/tableChooseDocumentExecution";
import ErrorAddData from "../../components/UI/error/errorAddData";
import MyButton from "../../components/UI/button/MyButton";
import classes from "../../components/UI/table/table.module.css";
import MyButtonNotActivated from "../../components/UI/button/MyButtonNotActivated";


const MoveDocumentExecution = observer(() => {
    const {documents} = useContext(Context)
    const [documentsList, setDocumentsList] = useState([])
    const [data, setData] = useState('')
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const onDocumentExecution = () => {
        documentCancel({orderId: documentsList[0].id, date: data})
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
    const [modalDocument, setModalDocument] = useState(false)
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <div className={classesComing.buttonSave}>
                <MyButton className={classes.button} onClick={onDocumentExecution}>Скасувати наряд</MyButton>
            </div>
            <h2>Скасування наряду</h2>
            <div className={classesComing.tableDocument}>
                <TableChooseSubdivisions data={data} setData={setData}/>
            </div>
            <div className={classesComing.tableTechnique}>

                {documents.documentExecutionList.length > 0
                    ? <MyButtonAdd onClick={() => setModalDocument(true)}>Обрати документ для скасування</MyButtonAdd>
                    : <MyButtonNotActivated onClick={() => setModalDocument(true)}>Обрати документ для
                        скасування</MyButtonNotActivated>
                }
                {documentsList.length > 0
                    ? <TableChooseDocumentExecution documentsList={documentsList} setDocumentsList={setDocumentsList}/>
                    : <h2>Виберіть наряд</h2>
                }
            </div>
            <MyModal visible={modalDocument} setVisible={setModalDocument}>
                <TableLookDocumentExecution documentsList={documentsList} setDocumentsList={setDocumentsList}
                                            setModalDocument={setModalDocument}/>
            </MyModal>

        </ErrorAddData>
    );
});

export default MoveDocumentExecution;