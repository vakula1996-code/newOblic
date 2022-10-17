import React, {useContext, useEffect, useState} from 'react';
import InputAutocomplit from "../../input/InputAutocomplit";
import Select from "../../select/select";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {nameCategory} from "../../../../http/Type";
import MyButton from "../../button/MyButton";
import classes from "../../../../pages/coming/coming.module.css";
import InputMui from "../../input/inputMui";

const FormNewNamaAndCategory = observer(() => {
    const {technique} = useContext(Context)
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [categoryForTable, setCategoryForTable] = useState('')
    const getCategory = () => {
        console.log(technique.listDeregistrationTechnique)
        if (technique.listDeregistrationTechnique.length > 0) {
            if (technique.listDeregistrationTechnique[0].typeTechniqueId !== undefined) {
                nameCategory(technique.listDeregistrationTechnique[0].typeTechniqueId).then(data => technique.setCategory(data))
            }
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
        if (price !== '') {
            list[0]['techniqueDetails']['price'] = price
            listId[0]['newPrice'] = price
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
    const handleChangeText = (e) => {
        setPrice(e.target.value)
    }
    return (
        <div>
            <MyButton onClick={changeNameAndCategory} style={{marginBottom: '10px'}}>Зберегти зміни</MyButton>
            <table className={classes.table}>
                <thead>
                <tr>
                    <th>Найменування</th>
                    <th>Категорія</th>
                    <th>Ціна за одиницю</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <InputAutocomplit value={name}
                                          label='Найменування'
                                          getData={(e) => handleChange(e)}
                                          nameState='nameTechnique'
                        />
                    </td>
                    <td>
                        <Select nameSelect="category" value={category}
                                name='categoryName'
                                label='Категорія'
                                getData={(e, data) => {
                                    setCategory(e.target.value)
                                    setCategoryForTable(data.props.children)
                                }}/>
                    </td>
                    <td>
                        <InputMui value={price}
                                  label='Ціна за одиницю'
                                  getData={(e) => handleChangeText(e)}/>
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    );
});

export default FormNewNamaAndCategory;