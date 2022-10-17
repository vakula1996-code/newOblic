import React, {useContext, useEffect,useState} from 'react';
import TableDeregistrationForSubdivision
    from "../../components/UI/table/Deregistration/tableDeregistrationForSubdivision";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import TableDeregegistrationLook from "../../components/UI/table/Deregistration/tableDeregegistrationLook";
import classes from "../move/move.module.css";
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";
import ErrorAddData from "../../components/UI/error/errorAddData";
import FormDocument from "../../components/UI/forms/documents/formDocument";
import {observer} from "mobx-react-lite";
import {
    nameDocument,
    nameSubdivisions,
} from "../../http/Type";
import {Context} from "../../index";
import classesComing from "../coming/coming.module.css";
import MyButton from "../../components/UI/button/MyButton";
import classesTable from "../../components/UI/table/table.module.css";
import {addNewTechniqueHttp, decommissionedTechnique} from "../../http/Technique";

const DeregistrationMove = observer(() => {
    const {documents} = useContext(Context)
    const {technique} = useContext(Context)
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(3).then(data => documents.setTypeDocumentComing(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [filterId, setFilterId] = useState([])
    const [dataList, setDataList] = useState([])
    const [listMoveTechnique, setListMoveTechnique] = useState([])
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const [doc, setDoc] = useState({})

    const decommissioned = () => {
        decommissionedTechnique(documents.document,listMoveTechnique, 'doc').catch(data => {
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
                <MyButton className={classesTable.button} onClick={decommissioned}>Зберегти</MyButton>
            </div>
            <h1>Списання</h1>
            <div className={classes.tableDocument}>
                <FormDocument error={error}/>
            </div>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Обрати майно для списання</MyButtonAdd>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableDeregistrationForSubdivision setVisibleWindow={setModalTechnique}
                                                   filterId={filterId} setFilterId={setFilterId} dataList={dataList}/>
            </MyModal>
            <TableDeregegistrationLook
                list={setListMoveTechnique} error={error}
                filterId={filterId} setFilterId={setFilterId}
            />
        </ErrorAddData>
    );
});

export default DeregistrationMove;