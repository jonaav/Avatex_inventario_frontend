import { useDispatch } from "react-redux";
import {
  onAddProducto,
  onAddVenta,
  onCancelVenta,
  onDeleteAllProductos,
  onDeleteProducto,
  onDeleteVentaActiva,
  onLoadVentas,
  onSearchVentas,
  onSetVentaActiva
} from "../store/ventasSlice";
import { inventarioApi } from "../../api";
import { buttonSwalDeleted, buttonSwalError, buttonSwalSaved, getNumMes } from "../../helpers";
import Swal from "sweetalert2";

export const useVentas = () => {

  const dispatch = useDispatch();

  //Ventas
  const startSearchVentas = ({ busqueda = '', filtro = '' }) => {
    dispatch(onSearchVentas({ busqueda, filtro }));
  }

  const startLoadVentas = async ({ filtroMes = '', filtroYear = '' }) => {
    let mes,year;
    if (filtroMes && filtroYear) {
      mes = getNumMes(filtroMes);
      year = filtroYear;
    } else {
      const fecha = new Date();
      mes = fecha.getMonth();
      year = fecha.getFullYear();
    }
    try {
      const { data } = await inventarioApi.get(`/ventas/${mes}/${year}`);
      const { ventas } = data;
      dispatch(onLoadVentas(ventas));
    } catch (error) {
      console.log(error)
    }
  }

  const startAddVenta = async (venta) => {
    try {
      const { data } = await inventarioApi.post('/ventas', venta);
      if (data.ok) dispatch(onAddVenta(data.venta))
      buttonSwalSaved(data.msg);
    } catch (error) {
      console.log(error)
      const { msg } = error.response.data;
      buttonSwalError(msg);
    }
  }

  const startCancelVenta = async (venta) => {
    try {
      const { id } = venta;
      Swal.fire({
        title: `Está seguro?`,
        text: `La venta se eliminará`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#207AC9",
        cancelButtonColor: "#C85656",
        confirmButtonText: "Sí, eliminar!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await inventarioApi.delete(`/ventas/${id}`);
          if (data.ok) dispatch(onCancelVenta(venta))
          buttonSwalDeleted(data.msg);
        }
      });
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      buttonSwalError(msg);
    }
  }

  //Venta activa
  const startSetVentaActiva = (venta) => {
    dispatch(onSetVentaActiva(venta))
  }
  const startDeleteVentaActiva = () => {
    dispatch(onDeleteVentaActiva())
  }
  //Productos de Venta
  const startAddProductoToVenta = (producto) => {
    dispatch(onAddProducto(producto))
  }
  const startDeleteProductoFromVenta = (producto) => {
    dispatch(onDeleteProducto(producto))
  }
  const startDeleteProductosFromVenta = () => {
    dispatch(onDeleteAllProductos())
  }

  return {
    startSearchVentas,
    startLoadVentas,
    startAddVenta,
    startCancelVenta,
    startSetVentaActiva,
    startDeleteVentaActiva,
    startAddProductoToVenta,
    startDeleteProductoFromVenta,
    startDeleteProductosFromVenta,
  };
}
