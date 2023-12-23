import { Grid, Typography } from "@mui/material"
import { TrebolLogo } from "./TrebolLogo"


const cloverSize = 50;

export const AvatexLogo = () => {
    return (
        <Grid padding sx={{ display: 'flex', flexGrow: 1 }} className="animate__animated animate__flipInX">
            {/* LOGO */}
            <TrebolLogo width={cloverSize} height={cloverSize} />
            <Typography
                fontSize={40} fontWeight={'bold'}
                sx={{ color: 'dorado.main' }}
            >Avatex
            </Typography>
        </Grid>
    )
}
