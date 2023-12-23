import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { ventaSlice } from "../ventas/store/ventasSlice";
import { proveedorSlice } from "../proveedores/store/proveedorSlice";
import { productoSlice } from "../productos/store/productoSlice";
import { kardexSlice } from "../contabilidad";
import { compraSlice } from "../compras";

export const store = configureStore({
    reducer: {
      ui: uiSlice.reducer,
      kardex: kardexSlice.reducer,
      venta: ventaSlice.reducer, 
      compra: compraSlice.reducer,
      producto: productoSlice.reducer,
      proveedor: proveedorSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware ({
      serializableCheck: false
    })
  })
  