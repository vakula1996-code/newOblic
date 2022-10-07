import React, {useState} from 'react';
import TableDeregistrationForSubdivision
    from "../../components/UI/table/Deregistration/tableDeregistrationForSubdivision";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";

const DeregistrationMove = () => {
    const [modalTechnique, setModalTechnique] = useState(false)
    const [listMove, setListMove] = useState([])
    const [filterId, setFilterId] = useState([])
    const [dataList, setDataList] = useState([])
    return (
        <div>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Обрати майно для списання</MyButtonAdd>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableDeregistrationForSubdivision setVisibleWindow={setModalTechnique}
                                                   filterId={filterId} setFilterId={setFilterId} dataList={dataList}/>
            </MyModal>
        </div>
    );
};

export default DeregistrationMove;