import React,{useEffect,useContext} from 'react';
import FormMoveRegistration from "../../components/UI/forms/documents/formMoveRegistration";
import {nameDocument, nameSubdivisions} from "../../http/Type";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import TableOrderNotRegistration from "../../components/UI/table/tableOrderNotRegistration";

const MoveRegistrationOutfit = observer(() => {
    const {document} = useContext(Context)

    useEffect(()=>{
        nameSubdivisions().then(data=> document.setTypeNumberSubdivisions(data))
        nameDocument(2).then(data=> document.setTypeDocumentComing(data))
    },[])
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20%'
        }}>
            <FormMoveRegistration/>
            <TableOrderNotRegistration/>
        </div>
    );
});

export default MoveRegistrationOutfit;