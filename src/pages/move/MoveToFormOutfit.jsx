import React, {useContext, useEffect, useState} from 'react';
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";
import MyModal from "../../components/UI/modal/MyModal";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TableMoveChoice from "../../components/UI/table/Move/tableMoveСhoice";
import TableLookMove from "../../components/UI/table/Move/tableLookMove";
import MyButton from "../../components/UI/button/MyButton";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import MyButtonNotActivated from "../../components/UI/button/MyButtonNotActivated";
import ErrorAddData from "../../components/UI/error/errorAddData";
import classes from './move.module.css'
import {$authHost} from "../../http";
import {CREATE_ORDER} from "../../utils/const";


const MoveToFormOutfit = observer(() => {
    const {documents} = useContext(Context)
    const {technique} = useContext(Context)

    const [filterId, setFilterId] = useState([])

    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => documents.setTypeDocumentComing(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [idSubdivision, setIdSubdivision] = useState()
    const [listMoveTechnique, setListMoveTechnique] = useState([])
    const [doc, setDoc] = useState()
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')

    async function move() {
        try {
            const response = await $authHost.post(CREATE_ORDER, {
                document: doc,
                techniques: listMoveTechnique
            }, {responseType: 'blob'})
            const objectURL = URL.createObjectURL(response.data)
            const a = document.createElement('a')
            a.setAttribute('href', objectURL)
            a.setAttribute('download', 'file.docx')
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(objectURL)
            setError('200')
        } catch (error) {
            if (
                error.request.responseType === 'blob' &&
                error.response.data instanceof Blob &&
                error.response.data.type
            ) {
                new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = () => {
                        error.response.data = JSON.parse(reader.result);
                        setError(error.response.data.detail)
                        setErrorMessages(error.response.data.detail)
                        resolve(Promise.reject(error));
                    };

                    reader.onerror = () => {
                        reject(error);
                    };

                    reader.readAsText(error.response.data);
                })
                    .then(err => {
                        // here your response comes
                        console.log(err.response.data)
                    })
            }
            console.log(JSON.parse(error.response.data))

        }

    }


    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <div>
                <h1>Формування наряду</h1>

                <FormDocumentMove
                    id={setIdSubdivision}
                    f={setDoc}
                    error={error}
                />
                <MyButton onClick={move}>Сформувати наряд</MyButton>
                {data.length > 0
                    ? <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати майно</MyButtonAdd>
                    : <MyButtonNotActivated onClick={() => setModalTechnique(true)}>Додати майно</MyButtonNotActivated>
                }
                <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                    <div className={classes.blockTable}>
                        <TableMoveChoice idSubdivision={idSubdivision} setData={setData} error={error}
                                         filterId={filterId} setFilterId={setFilterId}
                        />
                    </div>
                </MyModal>
                {technique.moveTechnique.length > 0

                    ? <TableLookMove list={setListMoveTechnique} error={error}
                                     filterId={filterId} setFilterId={setFilterId}
                    />
                    : <></>
                }
            </div>
        </ErrorAddData>
    );
});

export default MoveToFormOutfit;