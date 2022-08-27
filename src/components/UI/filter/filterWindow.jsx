import React, {useEffect, useState} from 'react';
import classes from './filterWindow.module.css'
import InputMui from "../input/inputMui";
import DepFilter from "./depFilter";
import Sort from "./filter";
import InputDate from "../input/inputDate";

const FilterWindow = ({visible, setVisible, dataList, dataFilter, setDataFilter}) => {
    const rootClasses = [classes.filterWindow]

    if (visible === true) {
        rootClasses.push(classes.active);
    }
    const [sortData1, setShortData1] = useState('')
    const [sortData2, setShortData2] = useState('')
    const [sortData3, setShortData3] = useState('')
    const [sortData4, setShortData4] = useState('')
    let filterName1 = Sort(dataList, sortData1, 'nameTechniques')
    let filterName2 = DepFilter(filterName1, sortData2, 'serialNumber', 'techniqueDetails')
    let filterName3 = DepFilter(filterName2, sortData3, 'price', 'techniqueDetails')
    let filterName4 = DepFilter(filterName3, sortData4, 'dateOfManufacture', 'techniqueDetails')
    useEffect(() => {
        setDataFilter(filterName4)
    }, [filterName1, filterName2, filterName3, filterName4])
    return (
        <div className={rootClasses.join(' ')}>
            <InputMui label='Назва тенхіки' getData={(e) => setShortData1(e.target.value)}/>
            <InputMui label='Серійний номер' getData={(e) => setShortData2(e.target.value)}/>
            <InputMui label='Ціна' getData={(e) => setShortData3(e.target.value)}/>
            <InputDate getData={(e) => setShortData4(e.target.value)} style={{marginTop: '-10px'}}/>
        </div>
    );
};

export default FilterWindow;