import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import TableChooseSubdivisions from "../../components/UI/table/Move/tableChooseSubdivisions";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import classesComing from "../coming/coming.module.css";
import TableLookDocumentExecution from "../../components/UI/table/Move/tableLookDocumentExecution";


const MoveDocumentExecution = observer(() => {

    return (
        <div>
            <TableChooseSubdivisions/>
            <TableLookDocumentExecution/>
        </div>
    );
});

export default MoveDocumentExecution;