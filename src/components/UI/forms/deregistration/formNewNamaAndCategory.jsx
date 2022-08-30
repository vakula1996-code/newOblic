import React, {useContext, useEffect, useState} from 'react';
import InputAutocomplit from "../../input/InputAutocomplit";
import Select from "../../input/select";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {nameCategory} from "../../../../http/Type";
import MyButton from "../../button/MyButton";

const FormNewNamaAndCategory = observer(() => {
    const {technique} = useContext(Context)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [categoryForTable, setCategoryForTable] = useState('')
    const getCategory = () => {
        if (technique.listDeregistrationTechniqueId) {
            nameCategory(technique.listDeregistrationTechniqueId[0].typeTechniqueId).then(data => technique.setCategory(data))
        }
    }
    useEffect(() => {
        getCategory()
    }, [technique.listDeregistrationTechniqueId])

    const changeNameAndCategory = () => {
        technique.setListDeregistrationTechnique([...technique.listDeregistrationTechnique,])
        const list = {...technique.listDeregistrationTechnique}
        list[0]['categoryName'] = categoryForTable
        technique.setListDeregistrationTechnique(list)
        list[0]['nameTechniques'] = name
        technique.setListDeregistrationTechnique(list)
        console.log('asd')
    }
    console.log(technique.listDeregistrationTechnique)
    return (
        <div>
            <InputAutocomplit value={name}
                              label='Назва'
                              getData={(e) => setName(e.target.innerHTML)}/>
            <Select nameSelect="category" value={category}
                    name='categoryName'
                    label='Категорія'
                    getData={(e, data) => {
                        setCategory(e.target.value)
                        setCategoryForTable(data.props.children)
                    }}/>
            <MyButton onClick={changeNameAndCategory}>Зберегти зміни</MyButton>
        </div>
    );
});

export default FormNewNamaAndCategory;