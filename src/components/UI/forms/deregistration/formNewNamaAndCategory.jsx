import React, {useContext, useEffect, useState} from 'react';
import InputAutocomplit from "../../input/InputAutocomplit";
import Select from "../../select/select";
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
        if (technique.listDeregistrationTechnique[0].typeTechniqueId) {
            nameCategory(technique.listDeregistrationTechnique[0].typeTechniqueId).then(data => technique.setCategory(data))
        }
    }
    useEffect(() => {
        getCategory()
    }, [technique.listDeregistrationTechniqueId])

    const changeNameAndCategory = () => {
        const list = [...technique.listDeregistrationTechnique]
        const listId = [...technique.listDeregistrationTechniqueId]
        if (category !== '') {
            list[0]['techniqueDetails']['category'] = categoryForTable
            listId[0]['newCategoryId'] = category
            technique.setListDeregistrationTechnique(list)
            technique.setListDeregistrationTechniqueId(listId)
        }
        if (name !== '') {
            list[0]['nameTechniques'] = name
            listId[0]['newName'] = name
            technique.setListDeregistrationTechnique(list)
            technique.setListDeregistrationTechniqueId(listId)
        }
    }
    const handleChange = (e) => {
        if (e.target.innerHTML) {
            setName(e.target.innerHTML)
        } else {
            setName(e.target.value)
        }
    }
    return (
        <div>
            <InputAutocomplit value={name}
                              label='Назва'
                              getData={(e) => handleChange(e)}/>
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