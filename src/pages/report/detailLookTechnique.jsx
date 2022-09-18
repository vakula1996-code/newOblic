import React,{useState} from 'react';
import {useParams} from "react-router-dom";

import TableDetailInfo from "../../components/UI/table/Report/tableDetailInfo";
import TableHistoryDocument from "../../components/UI/table/Report/tableHistoryDocument";
import TableHistory from "../../components/UI/table/Report/tableHistory";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as PropTypes from "prop-types";
import {Tab, Tabs} from "@mui/material";


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

const DetailLookTechnique = () => {
    const params = useParams()
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                    <Tab label="Детальна інформація" {...a11yProps(0)} />
                    <Tab label="Історія руху" {...a11yProps(1)} />
                    <Tab label="Історія документів" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TableDetailInfo params={params}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableHistoryDocument params={params}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TableHistory params={params}/>
            </TabPanel>
        </Box>

    );
};

export default DetailLookTechnique;