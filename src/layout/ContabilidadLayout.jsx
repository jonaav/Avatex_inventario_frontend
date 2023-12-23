import { Box, Toolbar } from "@mui/material"
import { Navbar } from "../components"


export const ContabilidadLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                backgroundColor: 'fondo.main',
                minHeight: '100vh',
            }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Navbar />
            <Box 
                component={'main'}
                padding={2}
                paddingTop={3}
                flexGrow={1}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    )
}
