import React, {useState,useContext, useEffect} from 'react';
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";
import MyModal from "../../components/UI/modal/MyModal";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import TableMoveChoice from "../../components/UI/table/tableMoveСhoice";
import TableLookMove from "../../components/UI/table/tableLookMove";

const MoveToFormOutfit = observer(() => {
    const {document} = useContext(Context)
    const {technique} = useContext(Context)

    useEffect(()=>{
        nameSubdivisions().then(data=> document.setTypeNumberSubdivisions(data))
        nameDocument(2).then(data=> document.setTypeDocumentComing(data))
    },[])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [idSubdivision, setIdSubdivision] = useState()
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center',marginLeft:'20%'}}>
            <button onClick={() => setModalTechnique(true)}>Додати техніку</button>
            <h2>Сформувати наряд</h2>
            <FormDocumentMove id={setIdSubdivision}/>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableMoveChoice idSubdivision={idSubdivision} />
            </MyModal>
            {technique.moveTechnique.length>0
                ?<TableLookMove/>
                :<h2>Добавте техніку для передачі</h2>
            }
        </div>
    );
});

export default MoveToFormOutfit;