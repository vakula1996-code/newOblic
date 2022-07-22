import * as React from 'react';
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
import {Link, NavLink} from "react-router-dom";
import classes from "./NavBar.module.css";
import {
    COMING_CHARITY,
    COMING_OUTFIT,
    COMING_PURCHASE,
    MOVE_CONFIRM_TRANSMISSION,
    MOVE_REGISTRATION,
    MOVE_TO_FORM
} from "../../utils/const";

export default function NavBar() {
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    const handleClick1 = () => {
        setOpen1(!open1);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const handleClick3 = () => {
        setOpen3(!open3);
    };
    const handleClick4 = () => {
        setOpen4(!open4);
    };
    const handleClick5 = () => {
        setOpen5(!open5);
    };

    return (
        <div style={{borderRight:"1px solid black", position:'absolute', height:'100%'}}>
            <List
                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
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
                        <NavLink to={COMING_PURCHASE} className={classes.link} >
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Закупка"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={COMING_OUTFIT} className={classes.link} >
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="По наряду"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={COMING_CHARITY} className={classes.link} >
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
                        <NavLink to={MOVE_TO_FORM} className={classes.link} >
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Сформувати наряд"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={MOVE_REGISTRATION} className={classes.link} >
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Зареєструвати наряд"/>
                            </ListItemButton>
                        </NavLink>
                        <NavLink to={MOVE_CONFIRM_TRANSMISSION} className={classes.link}>
                            <ListItemButton sx={{pl: 4}}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon fontSize='small'/>
                                </ListItemIcon>
                                <ListItemText primary="Підтвердити передачу"/>
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
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Передача"/>
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Модернізація (ремонт)"/>
                        </ListItemButton>
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
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="За підрозділ"/>
                        </ListItemButton>
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Рух техніки"/>
                        </ListItemButton>
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
                        <ListItemButton sx={{pl: 4}}>
                            <ListItemIcon>
                                <FiberManualRecordIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="За підрозділ"/>
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </div>

    );
}
