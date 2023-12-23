import { createSlice } from '@reduxjs/toolkit'
import { convertDate } from '../../helpers';

const initialCompraActiva = {
  factura: "",
  proveedor: "",
  productos: [],
  fecha: "",
  total: 0,
}

export const compraSlice = createSlice({
  name: 'compra',
  initialState: {
    productos: [],
    compras: [],
    busquedas: [],
    compraActiva: initialCompraActiva
  },
  reducers: {
    onSearchCompras: (state, { payload }) => {
      const { busqueda, filtro } = payload;
      if (busqueda.length <= 0 || filtro.length <= 0) {
        state.busquedas = state.compras
        return;
      }
      if (filtro === 'fecha') {
        state.busquedas = state.compras.filter(item => {
          const value = convertDate(item[filtro])
          return value.startsWith(busqueda)
        })
        return;
      }
      state.busquedas = state.compras.filter(item => {
        return item[filtro].toLowerCase().startsWith(busqueda.toLowerCase())
      })
    },
    onLoadCompras: (state, { payload = [] }) => {
      state.compras = payload
      state.busquedas = payload
    },
    onSetCompraActiva: (state, { payload }) => {
      state.compraActiva = payload;
    },
    onDeleteCompraActiva: (state) => {
      state.compraActiva = initialCompraActiva;
    },
    onAddCompra: (state, { payload }) => {
      state.compras.unshift(payload);
    },
    onUpdateFactura: (state, { payload }) => {
      state.compras = state.compras.map((compra) => {
        if(compra.id === payload.id){
          compra.factura = payload.factura;
        }
        return compra;
      })
    },
    onMarcarCompraPagada: (state, { payload }) => {
      state.compras = state.compras.map((compra) => {
        if(compra.id === payload.id){
          compra.pagado = payload.pagado;
        }
        return compra;
      })
    },
    onDeleteCompra: (state, { payload }) => {
      state.compras = state.compras.filter(compra =>
        compra.id !== payload.id
      );
      state.busquedas = state.busquedas.filter(compra =>
        compra.id !== payload.id
      );
    },
    onAddProducto: (state, { payload }) => {
      state.productos.push(payload);
    },
    onDeleteProducto: (state, { payload }) => {
      state.productos = state.productos.filter(producto =>
        producto.nombre !== payload.nombre
      );
    },
    onDeleteAllProductos: (state) => {
      state.productos = []
    },
  }
})

export const {
  onSearchCompras,
  onLoadCompras,
  onSetCompraActiva,
  onDeleteCompraActiva,
  onAddCompra,
  onUpdateFactura,
  onMarcarCompraPagada,
  onDeleteCompra,
  onAddProducto,
  onDeleteProducto,
  onDeleteAllProductos
} = compraSlice.actions
