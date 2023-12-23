import Modal from "react-modal"
import { useVentas } from '..';
import { useUiStore } from '../../hooks';
import { useSelector } from 'react-redux';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { ListaProductosInfoTable } from '../../components';
import { convertDate } from "../../helpers";



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '600px',
        maxWidth: '600px',
    },
};


Modal.setAppElement('#root');

export const InfoVentaModal = () => {


    const { isInfoModalOpen, closeInfoModal } = useUiStore();
    const { startDeleteVentaActiva } = useVentas();
    const { ventaActiva } = useSelector(state => state.venta);


    const onCloseModal = () => {
        startDeleteVentaActiva();
        closeInfoModal();
    }

    return (
        <Modal
            isOpen={isInfoModalOpen}
            onClose={onCloseModal}
            style={customStyles}
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}
        >

            <Grid container justifyContent={'space-between'} flexDirection={'row'}>
                <Divider />
                <Grid item paddingLeft={2} maxWidth={'80%'}>
                    <Typography fontSize={30}> Información de la venta </Typography>
                </Grid>
                <Grid item >
                    <IconButton onClick={onCloseModal}>
                        <Close sx={{ color: 'error.main' }}></Close>
                    </IconButton>
                </Grid>
            </Grid>

            <Grid container rowGap={2} justifyContent={'space-evenly'} padding={3}>
                <Grid item xs={12} display={'flex'}>
                    <Grid container rowGap={2} padding={1}>
                        <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                            <Typography fontSize={20} fontWeight={'bold'}>Fecha de venta:</Typography>
                            <Typography fontSize={20}>{convertDate(ventaActiva.fecha)}</Typography>
                        </Grid>
                        <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                            <Typography fontSize={20} fontWeight={'bold'}>Importe:</Typography>
                            <Typography fontSize={20}>S/.{(ventaActiva.total) ? ventaActiva.total.toFixed(2) : ''}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ListaProductosInfoTable productos={ventaActiva.productos} />
                </Grid>
            </Grid>
        </Modal >
    )
}
