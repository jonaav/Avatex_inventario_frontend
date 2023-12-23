import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";


export const NavListDrawer = ({ navArrayLinks, drawerWidth, setDrawerOpen, isSelectedButton, setIsSelectedButton }) => {

    const handleButtonClick = (title) => {
        setIsSelectedButton(title);
        setDrawerOpen(false);
    }

    return (
        <Box sx={{ width: drawerWidth }}>
            <nav>
                <List>
                    {navArrayLinks.map(({ title, path }) => (
                        <ListItem disablePadding
                            key={title}
                            sx={{
                                borderRadius: 2,
                                backgroundColor: (isSelectedButton === title)? 'dorado.main': 'transparent',
                                '&:hover': {
                                    backgroundColor: 'dorado.main',
                                },
                            }}
                        >
                            <ListItemButton
                                component={NavLink}
                                to={path}
                                sx={{
                                    color: (isSelectedButton === title)? 'azul.main': 'blanco.main',
                                    '&:hover': {
                                        color: "azul.main", // Cambia el color de fondo al pasar el mouse
                                    },
                                }}
                                onClick={()=>handleButtonClick(title)}
                            >
                                <ListItemText sx={{ ml: 2 }}>
                                    <Typography fontSize={22} fontWeight={500}>{title}</Typography>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </nav>
        </Box>
    )
}
