import { MenuOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, Drawer, IconButton, Toolbar } from "@mui/material"
import { useState } from "react";
import { NavListDrawer } from "./NavListDrawer";
import { NavLink } from "react-router-dom";
import { AvatexLogo } from "./AvatexLogo";


const navArrayLinks = [
    {
        title: 'Inicio',
        path: '/home',
    },
    {
        title: 'Ventas',
        path: '/ventas',
    },
    {
        title: 'Compras',
        path: '/compras',
    },
    {
        title: 'Productos',
        path: '/productos',
    },
    {
        title: 'Proveedores',
        path: '/proveedores',
    },
];


const drawerWidth = 250;


export const Navbar = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isSelectedButton, setIsSelectedButton] = useState(null);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const handleButtonClick = (e, buttonTitle) => {
        setIsSelectedButton(buttonTitle);
    };


    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    display: { xs: 'flex', sm: 'block' },
                    backgroundColor: 'azul.main'
                }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="blanco.main"
                        aria-label="menu"
                        onClick={openDrawer}
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuOutlined sx={{ color: 'dorado.main' }} />
                    </IconButton >
                    <AvatexLogo/>
                    <Box sx={{ display: { xs: 'none', md: 'block' }}} >
                        {
                            navArrayLinks.map(({ title, path }) => (
                                <Button
                                    key={title}
                                    component={NavLink}
                                    to={path}
                                    sx={{
                                        margin: '0 5px',
                                        fontSize:16,
                                        color: isSelectedButton === title ? 'dorado.main' : 'blanco.main',
                                        '&:hover': {
                                            borderRadius: 2,
                                            color: "dorado.main",
                                        },
                                    }}
                                    onClick={(e) => handleButtonClick(e, title)}
                                >{title}
                                </Button>
                            ))
                        }
                    </Box>

                </Toolbar>
            </AppBar>


            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={closeDrawer}
                sx={{
                    display: { xs: 'flex', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'azul.main',
                    },
                }}
            >
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <AvatexLogo/>
                </Toolbar>
                <Divider />
                <NavListDrawer
                    navArrayLinks={navArrayLinks}
                    drawerWidth={drawerWidth}
                    setDrawerOpen={setDrawerOpen}
                    isSelectedButton = {isSelectedButton}
                    setIsSelectedButton = {setIsSelectedButton}
                />
            </Drawer>



        </>
    )
}
