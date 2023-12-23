import { createSlice } from '@reduxjs/toolkit'


export const proveedorSlice = createSlice({
    name: 'proveedor',
    initialState: {
        proveedores: [],
        busquedas: [],
    },
    reducers: {

        onSearchProveedores: (state, { payload }) => {
            if (payload.busqueda.length > 0) {
                state.busquedas = state.proveedores.filter(proveedor =>
                    proveedor.nombre.toLowerCase().startsWith(payload.busqueda.toLowerCase())
                );
            } else {
                state.busquedas = state.proveedores
            }
        },
        onLoadProveedores: (state, { payload = [] }) => {
            state.proveedores = payload;
            state.busquedas = payload;
        },
        onAddProveedor: (state, { payload }) => {
            state.proveedores.unshift(payload);
        },
        onDeleteProveedor: (state, { payload }) => {
            state.proveedores = state.proveedores.filter( proveedor =>
                proveedor.nombre !== payload.nombre
            );
            state.busquedas = state.busquedas.filter( item =>
                item.nombre !== payload.nombre
            );
        },
    }
})

export const {
    onSearchProveedores,
    onLoadProveedores,
    onAddProveedor,
    onDeleteProveedor
} = proveedorSlice.actions
