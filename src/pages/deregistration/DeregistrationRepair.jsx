import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import TableDeregistrationForSubdivision
    from "../../components/UI/table/Deregistration/tableDeregistrationForSubdivision";
import MyModal from "../../components/UI/modal/MyModal";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import TableLookTechniqueForDeregistration
    from "../../components/UI/table/Deregistration/tableLookTechniqueForDeregistration";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import * as PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import {Context} from "../../index";
import TableTechniqueForModernization from "../../components/UI/table/Deregistration/tableTechniqueForModernization";
import {
    modernization,
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import MyButton from "../../components/UI/button/MyButton";
import FormNewNamaAndCategory from "../../components/UI/forms/deregistration/formNewNamaAndCategory";
import ErrorAddData from "../../components/UI/error/errorAddData";
import TableLookTechniqueForModernization
    from "../../components/UI/table/Deregistration/tableLookTechniqueForModernization";
import Select from "../../components/UI/select/select";
import {subdivisionsTechniques} from "../../http/Technique";
import FormDeregistrationNewTechnique from "../../components/UI/forms/deregistration/formDeregistrationNewTechnique";
import TableDeregastrationNewTechnique from "../../components/UI/table/Deregistration/tableDeregastrationNewTechnique";
import FormDocumentRepair from "../../components/UI/forms/deregistration/formDocumentRepair";
import classesComing from "../coming/coming.module.css";


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    index: PropTypes.number,
    children: PropTypes.node
};


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


const DeregistrationRepair = observer(() => {
    const [listMove, setListMove] = useState([])
    const [filterId, setFilterId] = useState([])
    const [filterIdExcluded, setFilterIdExcluded] = useState([])
    const [idSubdivision, setIdSubdivision] = useState()
    const [dataList, setDataList] = useState([])


    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
        nameDocument(3).then(data => documents.setTypeDocumentComing(data))
    }, [])

    useEffect(() => {
        if (idSubdivision !== undefined) {
            subdivisionsTechniques(idSubdivision).then(data => {
                setDataList(data);
            })
        }
    }, [idSubdivision])
    const {technique} = useContext(Context)
    const {documents} = useContext(Context)

    useEffect(() => {
        setListMove(technique.listDeregistrationTechnique)
    }, [technique.listDeregistrationTechnique])
    const [modalTechnique, setModalTechnique] = useState(false)
    const [modalModernization, setModalModernization] = useState(false)
    const [modalWithdrawal, setModalWithdrawal] = useState(false)
    const [modalExcluded, setModalExcluded] = useState(false)
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        nameTechniqueType().then(data => technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))
        nameTechnique().then(data => technique.setNameTechnique(data))
        nameMeasurements().then(data => technique.setMeasurements(data))
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])


    const [error, setError] = useState('')
    const [errorMessages, setErrorMessages] = useState('')
    const modernizationTechnique = () => {
        const data = {
            techniqueDetailId: technique.listDeregistrationTechniqueId[0].techniqueDetailId,
            howCategoryId: technique.listDeregistrationTechniqueId[0].howCategoryId,
            newName: technique.listDeregistrationTechniqueId[0].newName,
            newCategoryId: technique.listDeregistrationTechniqueId[0].newCategoryId,
            newPrice: technique.listDeregistrationTechniqueId[0].newPrice,
            input: technique.listModernizationTechniqueId,
            output: technique.listNewTechniqueFromModernization,
            expendables: technique.listTechniqueForExcludedId,
            document: documents.document[0]
        }

        modernization(data)
            .catch(data => {
                if (data.response.data.detail) {
                    setError(data.response.data.detail)
                    setErrorMessages(data.response.data.detail)
                } else if (data.response.status === 200) {
                    console.log(data)
                }
            }).then(data => {
            if (data !== undefined) {
                setError(data)
                setErrorMessages(data)
                window.location.reload()
            }
        })
    }
    return (
        <ErrorAddData error={error} setError={setError} errorMessages={errorMessages}>
            <div className={classesComing.buttonSave}>
                <MyButton onClick={modernizationTechnique}>Здійснити модернізацію</MyButton>
            </div>
            <h1>Модернізація</h1>
            <div className={classesComing.tableDocument}>
                <FormDocumentRepair error={error}/>
            </div>
            <div className={classesComing.tableTechnique}>
                <MyButtonAdd onClick={() => setModalTechnique(true)}>Обрати майно для модернізації
                    (ремонту)</MyButtonAdd>
                <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                    <TableDeregistrationForSubdivision setVisibleWindow={setModalTechnique}
                                                       filterId={filterId} setFilterId={setFilterId}
                                                       dataList={dataList}/>
                </MyModal>
                {listMove.length > 0
                    ?
                    <div>
                        <TableLookTechniqueForDeregistration setFilterId={setFilterId}/>

                        <Box>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}} style={{width: 'max-content'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                                    <Tab label="Модернізувати" {...a11yProps(0)} />
                                    <Tab label="Вилучити" {...a11yProps(1)} />
                                    {/*<Tab label="Списати витратні матеріали" {...a11yProps(2)} />*/}
                                    <Tab label="Редагування даних" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <MyButtonAdd onClick={() => setModalModernization(true)}>Додати майно для
                                    модернізації</MyButtonAdd>
                                <MyModal visible={modalModernization} setVisible={setModalModernization}>
                                    <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}
                                            name='subdivisionName'
                                            getData={e => setIdSubdivision(e.target.value)}/>
                                    <TableLookTechniqueForModernization filterId={filterId} setFilterId={setFilterId}
                                                                        setFilterIdExcluded={setFilterIdExcluded}
                                                                        dataList={dataList}/>
                                </MyModal>
                                <TableTechniqueForModernization filterId={filterId} setFilterId={setFilterId}/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <MyButtonAdd onClick={() => setModalWithdrawal(true)}>Вилучене майно</MyButtonAdd>
                                <MyModal visible={modalWithdrawal} setVisible={setModalWithdrawal}>
                                    <FormDeregistrationNewTechnique setVisible={setModalWithdrawal}/>
                                </MyModal>
                                <TableDeregastrationNewTechnique/>
                            </TabPanel>
                            {/*<TabPanel value={value} index={2}>*/}
                            {/*    <MyButtonAdd onClick={() => setModalExcluded(true)}>Витратні матеріали для*/}
                            {/*        списання</MyButtonAdd>*/}
                            {/*    <MyModal visible={modalExcluded} setVisible={setModalExcluded}>*/}
                            {/*        <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}*/}
                            {/*                name='subdivisionName'*/}
                            {/*                getData={e => setIdSubdivision(e.target.value)}/>*/}
                            {/*        <TableLookTechniqueForExcluded filterIdExcluded={filterIdExcluded}*/}
                            {/*                                       setFilterIdExcluded={setFilterIdExcluded}*/}
                            {/*                                       dataList={dataList} idSubdivision={idSubdivision}/>*/}
                            {/*    </MyModal>*/}
                            {/*    <TableTechniqueExcluded filterIdExcluded={filterIdExcluded}*/}
                            {/*                            setFilterIdExcluded={setFilterIdExcluded}/>*/}
                            {/*</TabPanel>*/}
                            <TabPanel value={value} index={2}>
                                <FormNewNamaAndCategory/>
                            </TabPanel>
                        </Box>
                    </div>
                    : <></>
                }
            </div>
        </ErrorAddData>
    );
});

export default DeregistrationRepair;