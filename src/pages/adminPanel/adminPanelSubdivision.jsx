import React, {useState} from 'react';
import classes from "./admin.module.css";
import MyButton from "../../components/UI/button/MyButton";
import TableAdminSubdivisions from "../../components/UI/table/adminPanel/tableAdminSubdivisions";
import MyModal from "../../components/UI/modal/MyModal";
import FormAdminSubdivision from "../../components/UI/forms/admin/formAdminSubdivision";

const AdminPanelSubdivision = () => {
    const [modalTechnique, setModalTechnique] = useState(false)
    const [idSubdivision, setIdSubdivision] = useState('')
    const subdivision = [
        {
            id: 1,
            subdivision: '3У',
            subordination: '',
        },
        {
            id: 2,
            subdivision: '1225',
            subordination: '3У',
        },
    ]
    const [data, setData] = useState(subdivision)
    return (
        <div>
            <div className={classes.buttonSave}>
                <MyButton>Зберегти</MyButton>
            </div>
            <h2>Підрозділи</h2>
            <TableAdminSubdivisions setModalTechnique={setModalTechnique} data={data} setData={setData}
                                    setIdSubdivision={setIdSubdivision}/>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <FormAdminSubdivision data={data} setData={setData} idSubdivision={idSubdivision}
                                      setModalTechnique={setModalTechnique}/>
            </MyModal>
        </div>
    );
};

export default AdminPanelSubdivision;