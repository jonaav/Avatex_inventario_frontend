import { createSlice } from '@reduxjs/toolkit'
import { convertDate } from '../../helpers';

export const kardexSlice = createSlice({
    name: 'kardex',
    initialState: {
        productos: [],
        busquedas: []
    },
    reducers: {
        onSearchKardex: (state, { payload }) => {
            const { busqueda, filtro } = payload;
            if (busqueda.length <= 0 || filtro.length <= 0) {
                state.busquedas = state.productos
                return;
            }
            if (filtro === 'fecha') {
                state.busquedas = state.productos.filter(item => {
                    const value = convertDate(item[filtro])
                    return value.startsWith(busqueda)
                })
                return;
            }
            state.busquedas = state.productos.filter(item => {
                return item[filtro].toLowerCase().startsWith(busqueda.toLowerCase())
            })
        },
        onLoadKardex: (state, { payload = [] }) => {
            state.productos = payload
            state.busquedas = payload
        },
        onAddKardexToBusquedas: (state, { payload = [] }) => {
            console.log(payload)
            payload.forEach(e => {
                state.productos.push(e);
                state.busquedas.push(e);
            });
        },

    }
})

export const {
    onSearchKardex,
    onLoadKardex,
    onAddKardexToBusquedas
} = kardexSlice.actions
