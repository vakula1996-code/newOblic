import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {nameSubdivisions} from "../../http/Type";
import {documentAll} from "../../http/Documents";
import {inventory} from "../../http/Technique";
import Select from "../../components/UI/select/select";
import TableLookTechnique from "../../components/UI/table/inventory/tableLookTechnique";
import TableLookOrders from "../../components/UI/table/inventory/tableLookOrders";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import {Tab, Tabs} from "@mui/material";
import TableDetailInfo from "../../components/UI/table/Report/tableDetailInfo";
import TableHistoryDocument from "../../components/UI/table/Report/tableHistoryDocument";

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
                <Box>
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

const InventoryForSubdivision = observer(() => {
    const {documents} = useContext(Context)
    const [idSubdivision, setIdSubdivision] = useState()
    const [dataList, setDataList] = useState([])
    useEffect(() => {
        nameSubdivisions().then(data => documents.setTypeNumberSubdivisions(data))
    }, [])
    useEffect(() => {
        if (idSubdivision !== undefined) {
            inventory(idSubdivision).then(data => {
                setDataList(data);
            })
        }
    }, [idSubdivision])

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <h1>Інвентризація</h1>
            <Select label="Підрозділ" nameSelect="numberSubdivisions" value={idSubdivision}
                    name='subdivisionName'
                    getData={e => setIdSubdivision(e.target.value)}/>
            {dataList['orders'] !== undefined || dataList['techniques'] !== undefined
                ?
                <div>

                    <Box sx={{borderBottom: 1, borderColor: 'divider'}} style={{width: 'max-content'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Непідтверджені наряди" {...a11yProps(0)} />
                            <Tab label="Майно за підрозділ" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <TableLookOrders dataList={dataList['orders']}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TableLookTechnique dataList={dataList['techniques']}/>
                    </TabPanel>
                </div>
                : <></>
            }


        </div>
    );
});

export default InventoryForSubdivision;