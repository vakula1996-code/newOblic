import React, {useState,useContext, useEffect} from 'react';
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";
import MyModal from "../../components/UI/modal/MyModal";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TableMoveChoice from "../../components/UI/table/tableMoveСhoice";
import TableLookMove from "../../components/UI/table/tableLookMove";
import {createOrder} from "../../http/Technique";

const MoveToFormOutfit = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)

    useEffect(()=>{
        nameSubdivisions().then(data=> document.setTypeNumberSubdivisions(data))
        nameDocument(2).then(data=> document.setTypeDocumentComing(data))
    },[])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [idSubdivision, setIdSubdivision] = useState()
    const [listMoveTechnique, setListMoveTechnique] = useState([])
    const [doc, setDoc] = useState()
    const move = () => {
        createOrder({document:doc,techniques:listMoveTechnique})
    }
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center',marginLeft:'20%'}}>
            <button onClick={move}><h2>Сформувати наряд</h2></button>
            <button onClick={() => setModalTechnique(true)}>Додати техніку</button>
            <FormDocumentMove id={setIdSubdivision} f={setDoc}/>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableMoveChoice idSubdivision={idSubdivision} />
            </MyModal>
            {technique.moveTechnique.length>0
                ?<TableLookMove list={setListMoveTechnique}/>
                :<h2>Добавте техніку для передачі</h2>
            }
        </div>
    );
});

export default MoveToFormOutfit;