import React from 'react';
import {observer} from "mobx-react-lite";
import TableReportForSubdivsion from "../../components/UI/table/Report/tableReportForSubdivsion";


const ReportForSubdivision = observer(() => {

    return (
        <div>
            <TableReportForSubdivsion/>
        </div>
    );
});

export default ReportForSubdivision;