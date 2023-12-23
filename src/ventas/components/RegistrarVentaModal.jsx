import { addHours } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import 'sweetalert2/dist/sweetalert2';
import { useUiStore } from "../../hooks";
import { Autocomplete, Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ListaProductosTable } from "../../components/ListaProductosTable";
import { AddBoxOutlined, AddOutlined, Close, DeleteForever, SaveAsOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useVentas } from "../";
import { cargarOpciones, styleButton } from "../../helpers";
import { Controller, useForm } from "react-hook-form";
import { useValidateForm } from "../../hooks";

registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxHeight: '680px',
        maxWidth: '700px',
    },
};

const initialFormValues = {
    total: 0
}


Modal.setAppElement('#root');

export const RegistrarVentaModal = () => {


    const { isNewVentaModalOpen, closeVentaModal } = useUiStore();
    const { startAddProductoToVenta, startAddVenta, startDeleteProductosFromVenta } = useVentas();
    const { productos } = useSelector(state => state.venta);
    const { productos: productosList } = useSelector(state => state.producto);

    const [formValues, setFormValues] = useState(initialFormValues)

    const { handleSubmit, formState: { errors }, reset, control } = useForm();
    const { register: registerDet, handleSubmit: handleSubmitDet,
        formState: { errors: errorsDet }, reset: resetDet, control: controlDet } = useForm();
    const { productoValidate, cantidadValidate, precioValidate } = useValidateForm();


    // Validaciones formProductos


    const optionsProductos = useMemo(() => cargarOpciones(productosList), [productosList]);

    useEffect(() => {
        if (productos.length > 0) {
            setFormValues({
                ...formValues,
                total: calcularTotal()
            })
        }
    }, [productos])

    const calcularTotal = () => {
        let montoTotal = 0;
        productos.forEach(p => {
            montoTotal = montoTotal + (p.precio * p.cantidad)
        });
        return parseFloat(montoTotal)
    }

    const onCloseModal = () => {
        reset();
        startDeleteProductosFromVenta();
        closeVentaModal();
    }

    const onSubmit = handleSubmit(async (data) => {
        
        data.productos = productos;
        data.total = formValues.total;
        await startAddVenta(data);
        onCloseModal();
    })

    const addProductToList = handleSubmitDet((data) => {
        const { producto, cantidad, precio } = data;
        const cantidadN = Number(cantidad);
        const precioN = Number(precio);
        startAddProductoToVenta({ nombre:producto, cantidad: cantidadN, precio: precioN });
        resetDet();
    })

    return (
        <Modal
            isOpen={isNewVentaModalOpen}
            onClose={onCloseModal}
            style={customStyles}
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}
        >
            <Grid container justifyContent={'space-between'} flexDirection={'row'} paddingBottom={2}>
                <Divider />
                <Grid item paddingLeft={2} maxWidth={'80%'}>
                    <Typography fontSize={30}> Nueva venta </Typography>
                </Grid>
                <Grid item >
                    <IconButton onClick={onCloseModal}>
                        <Close sx={{ color: 'error.main' }}></Close>
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container rowGap={1} justifyContent={'space-evenly'}>
                <Grid item xs={12} sm={5} >
                    <form onSubmit={addProductToList}>
                        <Grid container rowGap={2} padding={1}>
                            <Grid item className="form-group" sm={12}>
                                <Typography>Producto</Typography>
                                <Controller
                                    control={controlDet}
                                    name="producto"
                                    defaultValue="" // Establece el valor inicial según tus necesidades
                                    render={({ field }) => (
                                        <Autocomplete
                                            size="small"
                                            options={optionsProductos}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Producto"
                                                    className={`form-control`}
                                                />
                                            )}
                                            value={field.value}
                                            onChange={(_, newValue) => field.onChange(newValue)}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        />
                                    )}
                                    rules={productoValidate}
                                />
                                {
                                    errorsDet.producto && <Typography color={'rojo.main'}>{errorsDet.producto.message}</Typography>
                                }
                            </Grid>
                            <Grid item className="form-group " sm={12}>
                                <Typography>Cantidad (mts)</Typography>
                                <TextField
                                    type="text"
                                    size="small"
                                    className={`form-control`}
                                    placeholder="Metros"
                                    name="cantidad"
                                    autoComplete="off"
                                    {...registerDet('cantidad',cantidadValidate)}
                                />
                                {
                                    errorsDet.cantidad && <Typography color={'rojo.main'}>{errorsDet.cantidad.message}</Typography>
                                }
                            </Grid>
                            <Grid item className="form-group " sm={12}>
                                <Typography>Precio x mts</Typography>
                                <TextField
                                    type="text"
                                    size="small"
                                    className={`form-control`}
                                    placeholder="S/."
                                    name="precio"
                                    autoComplete="off"
                                    {...registerDet('precio',precioValidate)}
                                />
                                {
                                    errorsDet.precio && <Typography color={'rojo.main'}>{errorsDet.precio.message}</Typography>
                                }
                            </Grid>
                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    startIcon={<AddOutlined />}
                                    sx={styleButton.indigo}
                                >
                                    <Typography>Agregar</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <form onSubmit={onSubmit} >
                        <Grid container rowGap={2} padding={1}>
                            <Grid item className="form-group " sm={12}>
                                <Typography>Fecha de venta</Typography>
                                <Controller
                                    control={control}
                                    name="fecha"
                                    defaultValue={new Date()}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            selected={field.value}
                                            onChange={(date) => field.onChange(date)}
                                            onBlur={() => field.onBlur()}
                                            locale={'es'}
                                            className="form-control"
                                        />
                                    )}
                                // rules={fechaValidate}
                                />
                                {
                                    errors.fecha && <Typography color={'rojo.main'}>{errors.fecha.message}</Typography>
                                }
                            </Grid>
                            <Grid item className="form-group" sm={12} flexDirection={'row'}>
                                <Typography fontSize={25}>Total: S/.{formValues.total.toFixed(2)}</Typography>
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
                </Grid>
                <Grid item xs={12} sm={6.2}>
                    <ListaProductosTable productos={productos} tipo={'venta'} />
                </Grid>
            </Grid >
        </Modal >
    )
}
