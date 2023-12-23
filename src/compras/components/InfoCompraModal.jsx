
import Modal from "react-modal"
import 'sweetalert2/dist/sweetalert2';
import { useUiStore } from "../../hooks";
import { Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Close } from "@mui/icons-material";
import { convertDate, styleButton } from "../../helpers";
import { ListaProductosInfoTable } from "../../components";
import { useCompras } from "../hooks/useCompras";


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

export const InfoCompraModal = () => {


    const { isInfoModalOpen, closeInfoModal } = useUiStore();
    const { startDeleteCompraActiva, startMarcarCompraPagada } = useCompras();
    const { compraActiva } = useSelector(state => state.compra);


    const onCloseModal = () => {
        startDeleteCompraActiva();
        closeInfoModal();
    }

    const onMarcarPago = () => {
        startMarcarCompraPagada(compraActiva.id);
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
                    <Typography fontSize={30}> Información de la compra </Typography>
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
                            <Typography fontSize={20} fontWeight={'bold'}>N° de factura:</Typography>
                            <Typography fontSize={20}>{compraActiva.factura}</Typography>
                        </Grid>
                        <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                            <Typography fontSize={20} fontWeight={'bold'}>Proveedor:</Typography>
                            <Typography fontSize={20}>{compraActiva.proveedor}</Typography>
                        </Grid>
                        <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                            <Typography fontSize={20} fontWeight={'bold'}>Fecha de compra:</Typography>
                            <Typography fontSize={20}>{convertDate(compraActiva.fecha)}</Typography>
                        </Grid>
                        <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                            <Typography fontSize={20} fontWeight={'bold'}>Importe:</Typography>
                            <Typography fontSize={20}>S/.{(compraActiva.total) ? compraActiva.total.toFixed(2) : ''}</Typography>
                        </Grid>
                        <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                            <Typography fontSize={20} fontWeight={'bold'}>Estado:</Typography>
                            {
                                (compraActiva.pagado==='SI') ?
                                    <Typography fontSize={20}>Pagado</Typography>
                                    :<Typography fontSize={20} color={'rojo.main'}>Sin pagar</Typography>
                            }
                        </Grid>
                        {
                            (compraActiva.pagado==='NO') ?
                                <Grid item className="form-group " sm={12} display={'flex'} columnGap={1}>
                                    <Button sx={styleButton.indigo}
                                        onClick={onMarcarPago}
                                    >Marcar como pagado</Button>
                                </Grid>
                                : ''
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ListaProductosInfoTable productos={compraActiva.productos} />
                </Grid>
            </Grid>
        </Modal >
    )
}
