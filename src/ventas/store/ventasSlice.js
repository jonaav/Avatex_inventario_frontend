import { createSlice } from '@reduxjs/toolkit'
import { convertDate } from '../../helpers';

const initialVentaActiva = {
    id:'',
    productos: [],
    fecha: "",
    total: 0,
}

export const ventaSlice = createSlice({
    name: 'venta',
    initialState: {
        productos: [],
        ventas: [],
        busquedas: [],
        ventaActiva: initialVentaActiva
    },
    reducers: {
        onSearchVentas: (state, { payload }) => {
            const { busqueda, filtro } = payload;
            if (busqueda.length <= 0 || filtro.length <= 0) {
                state.busquedas = state.ventas
                return;
            }
            if (filtro === 'fecha') {
                state.busquedas = state.ventas.filter(item => {
                    const value = convertDate(item[filtro])
                    return value.startsWith(busqueda)
                })
                return;
            }
            state.busquedas = state.ventas.filter(item => {
                return item[filtro].toLowerCase().startsWith(busqueda.toLowerCase())
            })
        },
        onLoadVentas: (state, { payload = [] }) => {
            state.ventas = payload
            state.busquedas = payload
        },
        onSetVentaActiva: (state, { payload }) => {
          state.ventaActiva = payload;
        },
        onDeleteVentaActiva: (state) => {
          state.ventaActiva = initialVentaActiva;
        },
        onAddVenta: (state, { payload }) => {
          state.ventas.unshift(payload);
        },
        onCancelVenta: (state, { payload }) => {
          state.ventas = state.ventas.filter(venta =>
            venta.id !== payload.id
          );
          state.busquedas = state.busquedas.filter(venta =>
            venta.id !== payload.id
          );
        },
        onAddProducto: (state, { payload }) => {
            state.productos.push(payload);

        },
        onDeleteProducto: (state, { payload }) => {
            state.productos = state.productos.filter(producto =>
                producto.nombre !== payload.nombre &&
                producto.cantidad !== payload.cantidad &&
                producto.precio !== payload.precio
            );
        },
        onDeleteAllProductos: (state) => {
            state.productos = []
        },
    }
})

export const {
    onSearchVentas,
    onLoadVentas,
    onSetVentaActiva,
    onDeleteVentaActiva,
    onAddVenta,
    onCancelVenta,
    onAddProducto,
    onDeleteProducto,
    onDeleteAllProductos,
} = ventaSlice.actions
