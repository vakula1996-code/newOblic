import React from 'react';
import {useParams} from "react-router-dom";

import TableDetailInfo from "../../components/UI/table/Report/tableDetailInfo";
import TableHistoryDocument from "../../components/UI/table/Report/tableHistoryDocument";
import TableHistory from "../../components/UI/table/Report/tableHistory";

const DetailLookTechnique = () => {
    const params = useParams()

    return (
        <div>
            <TableDetailInfo params={params}/>
            <TableHistoryDocument params={params}/>
            <TableHistory params={params}/>

        </div>
    );
};

export default DetailLookTechnique;