import React,{useEffect,useState} from 'react';
import {subdivisionsTechniques} from "../../http/Technique";
import Select from "../../components/UI/select/select";

const LookDocuments = () => {
    const [idSubdivision, setIdSubdivision] = useState()
    const [dataList, setDataList] = useState([])

    useEffect(() => {
        if (idSubdivision !== undefined) {
            subdivisionsTechniques(idSubdivision).then(data => {
                setDataList(data);
            })
        }
    }, [idSubdivision])
    return (
        <div>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}
                    name='subdivisionName'
                    getData={e => setIdSubdivision(e.target.value)}/>

        </div>
    );
};

export default LookDocuments;