import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {nameSubdivisions} from "../../http/Type";
import {documentAll} from "../../http/Documents";
import {inventory} from "../../http/Technique";
import Select from "../../components/UI/select/select";
import TableLookTechnique from "../../components/UI/table/inventory/tableLookTechnique";
import TableLookOrders from "../../components/UI/table/inventory/tableLookOrders";

const InventoryForSubdivision = observer(() => {
    const {documents} = useContext(Context)
    const [idSubdivision, setIdSubdivision] = useState()
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    useEffect(() => {
        if (idSubdivision !== undefined) {
            inventory(idSubdivision).then(data => {
                setDataList(data);
            })
        }
    }, [idSubdivision])
    if(dataList['orders'])
    console.log()
    return (
        <div>
            <h1>Інвентризація</h1>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}
                    name='subdivisionName'
                    getData={e => setIdSubdivision(e.target.value)}/>
            {/*{dataList['orders'] !== undefined*/}
            {/*    ?*/}
            {/*    dataList['ordered'].length > 0*/}
            {/*        ?*/}
            {/*        <TableLookOrders dataList={dataList}/>*/}
            {/*        : <></>*/}
            {/*    :*/}
            {/*    <></>*/}
            {/*}*/}
            {/*{!dataList['orders']*/}
            {/*    ?*/}
            {/*    :<></>*/}

            {/*}*/}
            {/*<TableLookTechnique dataList={dataList}/>*/}
        </div>
    );
});

export default InventoryForSubdivision;