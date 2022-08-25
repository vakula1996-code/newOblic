import React, {useMemo, useState} from 'react';
import classes from './filterWindow.module.css'
import InputMui from "../input/inputMui";

const FilterWindow = ({ visible, setVisible,dataList,dataFilter,setDataFilter}) => {
    const rootClasses = [classes.filterWindow]

    if (visible===true){
        rootClasses.push(classes.active);
    }
    const [filter,setFilter]= useState('')
    const filterData = useMemo(() => {
        console.log(dataFilter)
        return dataFilter.filter(data=>data.nameTechniques.toLowerCase().includes(filter.toLowerCase()))
    },[filter,dataFilter])

    return (
        <div className={rootClasses.join(' ')} >
                <InputMui label='Назва тенхіки' getData={(e)=>setFilter(e.target.value)}/>
                <InputMui label='Серійний номер' />
                <InputMui label='Серійний номер' />
                <InputMui label='Серійний номер' />
                <InputMui label='Серійний номер' />
                <InputMui label='Серійний номер' />
        </div>
    );
};

export default FilterWindow;