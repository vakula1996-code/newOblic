import * as React from 'react';
import {useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

const MenuAppBar = observer(({visibleNavbar, setVisibleNavbar, className}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };


    const handleClose = () => {
        setAnchorEl(null)
    };

    const exit = () => {
        user.setIsAuth(false)
        localStorage.clear()
        navigate('/auth')
    }


    const visibleNav = () => {
        if (visibleNavbar === true)
            setVisibleNavbar(false)
        else {
            setVisibleNavbar(true)
        }
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                {user.isAuth === true
                    ?
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={visibleNav}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Головна
                        </Typography>
                        {user.isAuth === true
                            ?
                            <div style={{display: 'flex'}}>
                                {/*<IconButton*/}
                                {/*    size="large"*/}
                                {/*    aria-label="account of current user"*/}
                                {/*    aria-controls="menu-appbar"*/}
                                {/*    aria-haspopup="true"*/}
                                {/*    onClick={handleMenu}*/}
                                {/*    color="inherit"*/}
                                {/*>*/}
                                {/*    <AccountCircle/>*/}
                                {/*</IconButton>*/}
                                {/*<Menu*/}
                                {/*    id="menu-appbar"*/}
                                {/*    anchorEl={anchorEl}*/}
                                {/*    anchorOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'right',*/}
                                {/*    }}*/}
                                {/*    keepMounted*/}
                                {/*    transformOrigin={{*/}
                                {/*        vertical: 'top',*/}
                                {/*        horizontal: 'right',*/}
                                {/*    }}*/}
                                {/*    open={Boolean(anchorEl)}*/}
                                {/*    onClose={handleClose}*/}
                                {/*>*/}
                                {/*</Menu>*/}
                                {user.role === 'admin'
                                    &&
                                    <MenuItem><a href='/adminMain'
                                                 style={{
                                                     textDecoration: "none",
                                                     color: "white"
                                                 }}>Адміністрування</a></MenuItem>
                                }
                                <MenuItem onClick={exit}>Вихід</MenuItem>
                            </div>
                            :
                            <></>
                        }
                    </Toolbar>
                    :
                    <Toolbar>
                        <a href="/adminMain" style={{color: 'white', textDecoration: 'none'}}>Адміністрування
                        </a>
                    </Toolbar>
                }
            </AppBar>
        </Box>
    );
});

export default MenuAppBar;
