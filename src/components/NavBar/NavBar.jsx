import React, {useState} from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import {NavLink} from "react-router-dom";
import classes from "./NavBar.module.css";
import {
    ADMIN_PANEL_DOCUMENTS_NAME,
    ADMIN_PANEL_MEASUREMENT,
    ADMIN_PANEL_RECORD,
    ADMIN_PANEL_SUBDIVISION,
    ADMIN_PANEL_TYPE,
    ADMIN_PANEL_TYPE_ENSURING,
    ADMIN_PANEL_USERS,
    COMING_CHARITY,
    COMING_OUTFIT,
    COMING_PURCHASE,
    DEREGISTRATION_MOVE,
    DEREGISTRATION_REPAIR,
    ENSURING, INVENTORY,
    LOOK_DOCUMENTS,
    MOVE_CONFIRM_TRANSMISSION,
    MOVE_DOCUMENT_EXECUTION,
    MOVE_REGISTRATION,
    MOVE_TO_FORM,
    REPORT_FOR_SUBDIVISION
} from "../../utils/const";

export default function NavBar() {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open6, setOpen6] = useState(false);

    const handleClick1 = () => {
        setOpen1(!open1);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    };
    const handleClick2 = () => {
        setOpen1(false);
        setOpen2(!open2);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    };
    const handleClick3 = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(!open3);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    };
    const handleClick4 = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(!open4);
        setOpen5(false);
        setOpen6(false);
    };
    const handleClick5 = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(!open5);
        setOpen6(false);
    };
    const handleClick6 = () => {
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(!open6);

    };

    return (<div>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'rgba(243,230,221,0.95)'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick1}>
                    <ListItemIcon>
                        <MoveUpIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Постановка на облік"/>
                    {open1 ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={COMING_PURCHASE} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Закупка"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={COMING_OUTFIT} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="По наряду"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={COMING_CHARITY} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Шефська допомога"/>
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClick2}>
                    <ListItemIcon>
                        <MoveDownIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Передача майна"/>
                    {open2 ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={MOVE_TO_FORM} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Формування наряду"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={MOVE_REGISTRATION} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Реєстрація наряду"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={MOVE_CONFIRM_TRANSMISSION} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Підтвердження передачі"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={MOVE_DOCUMENT_EXECUTION} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Відміна наряду"/>
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClick3}>
                    <ListItemIcon>
                        <FolderDeleteIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Знятя з обліку"/>
                    {open3 ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open3} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={DEREGISTRATION_MOVE} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Списання"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={DEREGISTRATION_REPAIR} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Модернізація (ремонт)"/>
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick4}>
                    <ListItemIcon>
                        <AssessmentIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Звіти"/>
                    {open4 ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open4} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={ENSURING} className={classes.link}>

                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Забезпеченість"/>
                            </ListItemButton>
                        </NavLink>

                        <NavLink to={REPORT_FOR_SUBDIVISION} className={classes.link}>

                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Перегляд майна"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={LOOK_DOCUMENTS} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Перегляд документів"/>
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick5}>
                    <ListItemIcon>
                        <InventoryIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Інвентаризація"/>
                    {open5 ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open5} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={INVENTORY} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="За підрозділ"/>
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick6}>
                    <ListItemIcon>
                        <SupervisorAccountIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Адміністрування"/>
                    {open6 ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open6} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <NavLink to={ADMIN_PANEL_SUBDIVISION} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Підрозділи"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={ADMIN_PANEL_TYPE} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Типи"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={ADMIN_PANEL_TYPE_ENSURING} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Типи забезпечення"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={ADMIN_PANEL_MEASUREMENT} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Одиниці виміру"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={ADMIN_PANEL_DOCUMENTS_NAME} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Назви документів"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={ADMIN_PANEL_RECORD} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Записи"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={ADMIN_PANEL_USERS} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Користувачі"/>
                            </ListItemButton>
                        </NavLink>
                    </List>
                </Collapse>
            </List>
        </div>

    );
}
