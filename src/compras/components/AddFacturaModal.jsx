import { useEffect} from 'react'
import Modal from "react-modal"
import { useUiStore, useValidateForm } from '../../hooks'
import { Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Close, DeleteForever, SaveAsOutlined } from '@mui/icons-material';
import { styleButton } from '../../helpers';
import { useSelector } from 'react-redux';
import { useCompras } from '..';
import { useForm } from 'react-hook-form';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '250px',
        maxWidth: '400px',
    },
};

export const AddFacturaModal = () => {

    const { isAddFacturaModalOpen, closeModalAddFactura } = useUiStore();
    const { startUpdateFactura } = useCompras();
    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();
    const { compraActiva } = useSelector(state => state.compra);
    const { facturaValidate } = useValidateForm();

    useEffect(() => {
        setValue(
            'factura',compraActiva.factura
        )
    }, [compraActiva])
    
    const onCloseModal = () => {
        closeModalAddFactura();
        reset();
    }

    const onSubmit = handleSubmit(async (data) => {
        await startUpdateFactura(compraActiva.id, data.factura);
        onCloseModal();
    })


    return (
        <Modal
            isOpen={isAddFacturaModalOpen}
            onClose={onCloseModal}
            style={customStyles}
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}
        >
            <Grid container justifyContent={'space-between'} flexDirection={'row'} paddingBottom={1}>
                <Divider />
                <Grid item >
                    <IconButton onClick={onCloseModal}>
                        <Close sx={{ color: 'error.main' }}></Close>
                    </IconButton>
                </Grid>
            </Grid>
            <form onSubmit={onSubmit} >
                <Grid container justifyContent={'space-evenly'} rowSpacing={1}>

                    <Grid item className="form-group" sm={9}>
                        <Typography>N° Factura</Typography>
                        <TextField
                            type="text"
                            size="small"
                            className={`form-control`}
                            placeholder="Número de factura"
                            name="factura"
                            autoComplete="off"
                            {...register('factura',facturaValidate)}
                        />
                        {
                            errors.factura && <Typography color={'rojo.main'}>{errors.factura.message}</Typography>
                        }
                    </Grid>
                    <Grid item display={'flex'} columnGap={1}>
                        <Button
                            type="submit"
                            variant="outlined"
                            startIcon={<SaveAsOutlined />}
                            sx={styleButton.verde}
                        >
                            <Typography>Guardar</Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<DeleteForever />}
                            sx={styleButton.rojo}
                            onClick={onCloseModal}
                        >
                            <Typography>Cancelar</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Modal>
    )
}
