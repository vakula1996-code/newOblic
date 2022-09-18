import React, {useEffect, useState} from 'react';
import TableNameDocument from "../../components/UI/table/adminPanel/tableNameDocument";
import {nameDocument} from "../../http/Type";
import Select from "../../components/UI/select/select";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import MyButtonAdd from "../../components/UI/button/MyButtonAdd";
import MyButton from "../../components/UI/button/MyButton";

const AdminPanelAddData = () => {
    const [nameDoc, setNameDoc] = useState([])
    const [idDoc, setIdDoc] = useState('')
    useEffect(() => {
        nameDocument(1).then(data => setNameDoc(data))
    }, [])
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
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
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    return (

        <Box
            sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex', position: 'absolute', left: 260,}}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {/*<Select label='Назва документа' nameSelect="typeDocumentCharity" value={idDoc} name='documentName'*/}
                {/*        getData={(data) => setIdDoc(data.target.value)}/>*/}
                <TableNameDocument data={nameDoc} name='documentName'/>
                <MyButton>Додати</MyButton>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
};

export default AdminPanelAddData;