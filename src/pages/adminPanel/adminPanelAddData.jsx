import React, {useEffect, useState} from 'react';
import TableNameDocument from "../../components/UI/table/adminPanel/tableNameDocument";
import {nameDocument} from "../../http/Type";
import Select from "../../components/UI/input/select";

const AdminPanelAddData = () => {
    const [nameDoc, setNameDoc] = useState([])
    const [idDoc, setIdDoc] = useState('')
    useEffect(()=>{
        nameDocument(1).then(data=>setNameDoc(data))
    },[])
    return (
        <div>
            <Select label='Назва документа' nameSelect="typeDocumentCharity" value={idDoc} name='documentName'
                    getData={(data) => setIdDoc(data.target.value)}/>
            <TableNameDocument data={nameDoc} name='documentName'/>
        </div>
    );
};

export default AdminPanelAddData;