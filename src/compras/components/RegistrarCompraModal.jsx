import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import 'sweetalert2/dist/sweetalert2';
import { useUiStore, useValidateForm } from "../../hooks";
import {
    Autocomplete,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import { ListaProductosTable } from "../../components/ListaProductosTable";
import { AddOutlined, Close, DeleteForever, SaveAsOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useCompras } from "../";
import { cargarOpciones, styleButton } from "../../helpers";
import { Controller, useForm } from "react-hook-form";

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
    total: 0,
    urlFactura: '',
}

Modal.setAppElement('#root');

export const RegistrarCompraModal = () => {


    const { isNewCompraModalOpen, closeCompraModal } = useUiStore();
    const { startAddProductoToCompra, startAddCompra, startDeleteProductosFromCompra } = useCompras();
    const { productos } = useSelector(state => state.compra);
    const { productos: productosList } = useSelector(state => state.producto);
    const { proveedores: proveedoresList } = useSelector(state => state.proveedor);
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm();
    const { register: registerDet, handleSubmit: handleSubmitDet,
        formState: { errors: errorsDet }, reset: resetDet, control: controlDet } = useForm();
    const { proveedorValidate, productoValidate, cantidadValidate, precioValidate } = useValidateForm();

    const [formValues, setFormValues] = useState(initialFormValues)

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
        resetDet();
        closeCompraModal();
    }

    const onSubmit = handleSubmit(async (data) => {
        data.productos = productos;
        data.total = formValues.total;
        await startAddCompra(data);
        startDeleteProductosFromCompra();
        onCloseModal();
    })

    const addProductToList = handleSubmitDet((data) => {
        const { producto, cantidad, precio } = data;
        //Paraseo de valores string to Number
        const cantidadN = Number(cantidad);
        const precioN = Number(precio);
        startAddProductoToCompra({ nombre:producto, cantidad: cantidadN, precio: precioN });
        resetDet();
    })

    const optionsProductos = useMemo(() => cargarOpciones(productosList), [productosList]);
    const optionsProveedores = useMemo(() => cargarOpciones(proveedoresList), [proveedoresList]);


    return (
        <Modal
            isOpen={isNewCompraModalOpen}
            onClose={onCloseModal}
            style={customStyles}
            className={"modal"}
            overlayClassName={"modal-fondo"}
            closeTimeoutMS={200}
        >
            <Grid container justifyContent={'space-between'} flexDirection={'row'} paddingBottom={2}>
                <Divider />
                <Grid item paddingLeft={2} maxWidth={'80%'}>
                    <Typography fontSize={30}>Nueva compra</Typography>
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
                            <Grid item className="form-group " sm={12}>
                                <Typography>Productos</Typography>
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
                                <Typography>Precio (x mts)</Typography>
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
                            <Grid item className="form-group" sm={12}>
                                <Typography>Proveedor</Typography>
                                <Controller
                                    control={control}
                                    name="proveedor"
                                    defaultValue="" // Establece el valor inicial según tus necesidades
                                    render={({ field }) => (
                                        <Autocomplete
                                            size="small"
                                            options={optionsProveedores}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Proveedor"
                                                    className={`form-control`}
                                                />
                                            )}
                                            value={field.value}
                                            onChange={(_, newValue) => field.onChange(newValue)}
                                            isOptionEqualToValue={(option, value) => option === value}
                                        />
                                    )}
                                    rules={proveedorValidate}
                                />
                                {
                                    errors.proveedor && <Typography color={'rojo.main'}>{errors.proveedor.message}</Typography>
                                }
                            </Grid>
                            <Grid item className="form-group" sm={12}>
                                <Typography>N° Factura</Typography>
                                <TextField
                                    type="text"
                                    size="small"
                                    className={`form-control`}
                                    placeholder="Número de factura"
                                    name="factura"
                                    autoComplete="off"
                                    {...register('factura')}
                                />
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
                    <ListaProductosTable productos={productos} tipo={'compra'} />
                </Grid>
            </Grid>
        </Modal >
    )
}
