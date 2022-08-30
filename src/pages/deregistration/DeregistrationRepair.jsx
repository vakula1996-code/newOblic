import React, {useState, useContext, useEffect} from 'react';
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
import TableLookTechniqueForModernization
    from "../../components/UI/table/Deregistration/tableLookTechniqueForModernization";
import TableTechniqueForModernization from "../../components/UI/table/Deregistration/tableTechniqueForModernization";
import FormDeregistrationNewTechnique from "../../components/UI/forms/deregistration/formDeregistrationNewTechnique";
import {
    nameDocument,
    nameEnsuring,
    nameMeasurements,
    nameSubdivisions,
    nameTechnique,
    nameTechniqueType
} from "../../http/Type";
import TableDeregastrationNewTechnique from "../../components/UI/table/Deregistration/tableDeregastrationNewTechnique";
import TableLookTechniqueForExcluded from "../../components/UI/table/Deregistration/tableLookTechniqueForExcluded";
import TableTechniqueExcluded from "../../components/UI/table/Deregistration/tableTechniqueExcluded";
import MyButton from "../../components/UI/button/MyButton";
import DateNow from "../../components/UI/calendar/dateNow";


const DeregistrationRepair = observer(() => {
    const [listMove, setListMove] = useState([])
    const {technique} = useContext(Context)
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
    useEffect(()=>{
        nameTechniqueType().then(data=> technique.setTypeTechnique(data))
        nameEnsuring().then(data => technique.setTypeEnsuring(data))
        nameTechnique().then(data=> technique.setNameTechnique(data))
        nameMeasurements().then(data=> technique.setMeasurements(data))
    },[])

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
                        <Typography>{children}</Typography>
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
    const [techniqueDeregistration , setTechniqueDeregistration] = useState({
        techniqueDetailId: '',
        howCategoryId: '',
        newName: '',
        newCategoryId: '',
    })
    const [newDetail , setNewDetail] = useState([{
        techniqueDetailId: '',
        howCategoryId: '',
        count: ''
    }])
    const [techniqueWithdrawal, setTechniqueWithdrawal] = useState([{
        techniqueTypeId: '',
        ensuringTypeId: '',
        techniqueName: '',
        measurementId: '',
        subdivisionId: '',
        details:
            {
                serialNumber: 'Б/Н',
                price: '',
                categoryId: '',
                count: 1,
                dateOfManufacture: DateNow()
            }
    }])
    const [techniqueExcluded, setTechniqueExcluded] = useState([{
        techniqueDetailId: '',
        howCategoryId: '',
        count: '',
        subdivisionId: ''
    }])

    return (
        <div>
            <h2>Модернізація</h2>
            <MyButtonAdd onClick={() => setModalTechnique(true)}>Додати техніку для модернізації(ремонту)</MyButtonAdd>
            <MyModal visible={modalTechnique} setVisible={setModalTechnique}>
                <TableDeregistrationForSubdivision setTechniqueDeregistration={setTechniqueDeregistration}/>
            </MyModal>
            {listMove.length > 0
                ?
                <div>
                    <TableLookTechniqueForDeregistration/>
                    <MyButton>Здійснити модернізацію</MyButton>
                    <Box sx={{width: '100%'}}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                                <Tab label="Модернізувати" {...a11yProps(0)} />
                                <Tab label="Вилучити" {...a11yProps(1)} />
                                <Tab label="Списати розхідні матеріали" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <MyButtonAdd onClick={() => setModalModernization(true)}>Додати техніку для модернізації</MyButtonAdd>
                            <MyModal visible={modalModernization} setVisible={setModalModernization}>
                                <TableLookTechniqueForModernization/>
                            </MyModal>
                            <TableTechniqueForModernization/>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MyButtonAdd onClick={() => setModalWithdrawal(true)}>Вилучена техніка</MyButtonAdd>
                            <MyModal visible={modalWithdrawal} setVisible={setModalWithdrawal}>
                                <FormDeregistrationNewTechnique/>
                            </MyModal>
                            <TableDeregastrationNewTechnique/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <MyButtonAdd onClick={() => setModalExcluded(true)}>Витратні матеріали для списання</MyButtonAdd>
                            <MyModal visible={modalExcluded} setVisible={setModalExcluded}>
                                <TableLookTechniqueForExcluded/>
                            </MyModal>
                            <TableTechniqueExcluded/>
                        </TabPanel>
                    </Box>
                </div>
                : <></>
            }

        </div>
    );
});

export default DeregistrationRepair;