import React from 'react';
import FormDocumentMove from "../../components/UI/forms/documents/formDocumentMove";

const MoveToFormOutfit = () => {
    return (
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center', marginRight:'10%'}}>
            <h2>Сформувати наряд</h2>
            <FormDocumentMove/>
        </div>
    );
};

export default MoveToFormOutfit;