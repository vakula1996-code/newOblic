import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import TableChooseSubdivisions from "../../components/UI/table/Move/tableChooseSubdivisions";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import classesComing from "../coming/coming.module.css";
import TableLookDocumentExecution from "../../components/UI/table/Move/tableLookDocumentExecution";
import MyButtonChoice from "../../components/UI/button/MyButtonChoice";
import {documentCancel} from "../../http/Documents";
import {Context} from "../../index";
import TableChooseDocumentExecution from "../../components/UI/table/Move/tableChooseDocumentExecution";
import ErrorAddData from "../../components/UI/error/errorAddData";
import MyButton from "../../components/UI/button/MyButton";
import classes from "../../components/UI/table/table.module.css";
import MyButtonNotActivated from "../../components/UI/button/MyButtonNotActivated";
import {toJS} from "mobx";


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
                <MyButton className={classes.button} onClick={onDocumentExecution}>Вилучити наряд</MyButton>
            </div>
            <h2>Відміна наряду</h2>
            <TableChooseSubdivisions data={data} setData={setData}/>
            {documents.documentExecutionList.length > 0
                ? <MyButtonAdd onClick={() => setModalDocument(true)}>Обрати документ для вилучення</MyButtonAdd>
                : <MyButtonNotActivated onClick={() => setModalDocument(true)}>Обрати документ для вилучення</MyButtonNotActivated>
            }
            <MyModal visible={modalDocument} setVisible={setModalDocument}>
                <TableLookDocumentExecution documentsList={documentsList} setDocumentsList={setDocumentsList}
                                            setModalDocument={setModalDocument}/>
            </MyModal>
            {documentsList.length > 0
                ? <TableChooseDocumentExecution documentsList={documentsList} setDocumentsList={setDocumentsList}/>
                : <></>
            }
        </ErrorAddData>
    );
});

export default MoveDocumentExecution;