import { createSlice } from '@reduxjs/toolkit'

export const productoSlice = createSlice({
    name: 'producto',
    initialState: {
        productos: [],
        busquedas: [],
        selected: {}
    },
    reducers: {
        onSearchProductos: (state, { payload }) => {
            if(payload.busqueda.length>0){
            state.busquedas = state.productos.filter(producto => 
                producto.nombre.toLowerCase().startsWith(payload.busqueda.toLowerCase())
            )
            }else{
                state.busquedas = state.productos 
            }
        },
        onLoadProductos: (state, { payload = [] }) => {
            state.productos = payload;
            state.busquedas = payload;
        },
        onSelectProduct:(state, { payload }) => {
            state.selected = payload;
        },
        onDeleteSelectProduct:(state ) => {
            state.selected = {};
        },
        onAddProducto: (state, { payload }) => {
            state.productos.unshift(payload)
        },
        onUpdateProducto: (state, { payload }) => {
            state.productos = state.productos.map( producto => 
                (producto.id == payload.id)? payload : producto
            );
        },
        onDeleteProducto: (state, { payload }) => {
            state.productos = state.productos.filter( producto => 
                producto.nombre !== payload.nombre
            );
            state.busquedas = state.busquedas.filter( item => 
                item.nombre !== payload.nombre 
            );
        },
    }
})

export const {
    onSearchProductos,
    onLoadProductos,
    onSelectProduct,
    onDeleteSelectProduct,
    onAddProducto,
    onUpdateProducto,
    onDeleteProducto
} = productoSlice.actions
