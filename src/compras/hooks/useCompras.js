import { useDispatch } from "react-redux"
import {
  onAddCompra,
  onAddProducto,
  onDeleteCompra,
  onDeleteAllProductos,
  onDeleteCompraActiva,
  onDeleteProducto,
  onLoadCompras,
  onSearchCompras,
  onSetCompraActiva,
  onMarcarCompraPagada,
  onUpdateFactura
} from "../";
import { inventarioApi } from "../../api";
import { buttonSwalDeleted, buttonSwalError, buttonSwalSaved, getNombreMes } from "../../helpers";
import Swal from "sweetalert2";

export const useCompras = () => {

  const dispatch = useDispatch();

  //Compras
  const startSearchCompras = ({ busqueda = '', filtro = '' }) => {
    dispatch(onSearchCompras({ busqueda, filtro }));
  }

  const startLoadCompras = async ({ filtroMes = '', filtroYear = '' }) => {
    let mes,year;
    if (filtroMes && filtroYear) {
      mes = filtroMes.charAt(0).toUpperCase() + filtroMes.slice(1);
      year = filtroYear.toString();
    } else {
      const fecha = new Date();
      mes = getNombreMes(fecha);
      year = fecha.getFullYear().toString();
    }
    try {
      const { data } = await inventarioApi.get(`/compras/${mes}/${year}`);
      const compras = data.compras
      dispatch(onLoadCompras(compras));
    } catch (error) {
      console.log(error)
    }
  }

  const startAddCompra = async (compra) => {
    try {
      const { data } = await inventarioApi.post('/compras', compra);
      dispatch(onAddCompra(data.compra))
      buttonSwalSaved(data.msg);
    } catch (error) {
      console.log(error)
      const { msg } = error.response.data;
      buttonSwalError(msg);
    }
  }

  const startUpdateFactura = async (id, factura) => {
    const campo = 'factura';
    const value = factura;
    try {
      const { data } = await inventarioApi.patch(`/compras/${id}`, {campo,value});
      if ( data.ok ) dispatch(onUpdateFactura(data.compra));
      buttonSwalSaved(data.msg);
    }catch (error){
      console.log(error)
      const { msg } = error.response.data;
      buttonSwalError(msg);
    }
  }
//updatePagado
  const startMarcarCompraPagada = async (id) => {
    try {
      const { data } = await inventarioApi.get(`/compras/${id}`);
      if ( data.ok ) dispatch(onMarcarCompraPagada(data.compra));
      buttonSwalSaved(data.msg);
    } catch (error) {
      console.log(error)
      const { msg } = error.response.data;
      buttonSwalError(msg);
    }
  }

  const startDeleteCompra = async (compra) => {
    try {
      const { id } = compra;
      Swal.fire({
        title: `Está seguro?`,
        text: `La compra ${compra.factura} se borrará`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#207AC9",
        cancelButtonColor: "#C85656",
        confirmButtonText: "Sí, eliminar!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await inventarioApi.delete(`/compras/${id}`);
          if (data.ok) dispatch(onDeleteCompra(compra));
          buttonSwalDeleted(data.msg);
        }
      });
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      buttonSwalError(msg);
    }
  }

  //Compra activa
  const startSetCompraActiva = (compra) => {
    dispatch(onSetCompraActiva(compra))
  }
  const startDeleteCompraActiva = () => {
    dispatch(onDeleteCompraActiva())
  }
  //Productos de compra
  const startAddProductoToCompra = (producto) => {
    dispatch(onAddProducto(producto))
  }
  const startDeleteProductoFromCompra = (producto) => {
    dispatch(onDeleteProducto(producto))
  }
  const startDeleteProductosFromCompra = () => {
    dispatch(onDeleteAllProductos())
  }

  return {
    //Compras
    startSearchCompras,
    startLoadCompras,
    startAddCompra,
    startUpdateFactura,
    startMarcarCompraPagada,
    startDeleteCompra,
    //Compra activa
    startSetCompraActiva,
    startDeleteCompraActiva,
    //Productos de compra
    startAddProductoToCompra,
    startDeleteProductoFromCompra,
    startDeleteProductosFromCompra,
  }
}
