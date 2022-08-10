import React, {useState, useContext, useEffect} from 'react';
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";
import MyModal from "../../components/UI/modal/MyModal";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TableMoveChoice from "../../components/UI/table/Move/tableMoveСhoice";
import TableLookMove from "../../components/UI/table/Move/tableLookMove";
import {createOrder} from "../../http/Technique";
import MyButton from "../../components/UI/button/MyButton";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import MyButtonNotActivated from "../../components/UI/button/MyButtonNotActivated";

const MoveToFormOutfit = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)

    useEffect(() => {
        nameSubdivisions().then(data => document.setTypeNumberSubdivisions(data))
        nameDocument(4).then(data => document.setTypeDocumentComing(data))
    }, [])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [idSubdivision, setIdSubdivision] = useState()
    const [listMoveTechnique, setListMoveTechnique] = useState([])
    const [doc, setDoc] = useState()
    const [data, setData] = useState([])
    const move = () => {
        createOrder({document: doc, techniques: listMoveTechnique})
    }
    return (
        <div>
            <h1>Сформувати наряд</h1>
            <FormDocumentMove id={setIdSubdivision} f={setDoc}/>
            {data.length > 0
                ? <MyButtonAdd onClick={() => setModalTechnique(true)} >Додати техніку</MyButtonAdd>
                : <MyButtonNotActivated onClick={() => setModalTechnique(true)} >Додати техніку</MyButtonNotActivated>
            }
                <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                    <TableMoveChoice idSubdivision={idSubdivision} setData={setData}/>
                </MyModal>
            {technique.moveTechnique.length
                ?<div><TableLookMove list={setListMoveTechnique}/><MyButton onClick={move}>Свормувати наряд</MyButton></div>

                :<h2>Добавте техніку для передачі</h2>
            }
                </div>
                );
            });

            export default MoveToFormOutfit;