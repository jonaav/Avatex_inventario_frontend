import { useDispatch } from "react-redux";
import { onAddProducto, onDeleteProducto, onLoadProductos, onSearchProductos, onUpdateProducto, onSelectProduct, onDeleteSelectProduct } from "../store/productoSlice";
import { inventarioApi } from "../../api";
import Swal from "sweetalert2";
import { buttonSwalDeleted, buttonSwalError, buttonSwalSaved, formatNombre } from "../../helpers";


export const useProductos = () => {

    const dispatch = useDispatch();

    const startSearchProductos = ({ busqueda }) => {
        dispatch(onSearchProductos({ busqueda }));
    }
    const startLoadProductos = async () => {
        try {
            const { data } = await inventarioApi.get('/productos');
            const { productos } = data;
            dispatch(onLoadProductos(productos));
        } catch (error) {
            console.log(error)
        }
    }

    const startSelectProducto = (producto) => {
        dispatch(onSelectProduct(producto));
    }
    const startDeleteSelectProducto = () => {
        dispatch(onDeleteSelectProduct());
    }

    const startSaveProducto = async (producto) => {
        try {
            const {nombre} = producto;
            producto.nombre = formatNombre(nombre);
            if(producto.id){
                const {id} = producto;
                const { data } = await inventarioApi.put(`/productos/${id}`, producto);
                if (data.ok) dispatch(onUpdateProducto(data.producto));
                buttonSwalSaved(data.msg);
            }else{
                const { data } = await inventarioApi.post('/productos', producto);
                if (data.ok) dispatch(onAddProducto(data.producto));
                buttonSwalSaved(data.msg);
            }
        } catch (error) {
            console.log(error)
            buttonSwalError(error.response.data.msg);
        }
    }

    const startDeleteProducto = async (producto) => {
        try {
            const { id, nombre } = producto;
            Swal.fire({
                title: `Está seguro?`,
                text: `Los datos de ${nombre} se borrarán`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#207AC9",
                cancelButtonColor: "#C85656",
                confirmButtonText: "Sí, eliminar!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await inventarioApi.delete(`/productos/${id}`);
                    if (data.ok) dispatch(onDeleteProducto(producto));
                    buttonSwalDeleted(data.msg)
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
    return {
        startSearchProductos,
        startLoadProductos,
        startSelectProducto,
        startDeleteSelectProducto,
        startSaveProducto,
        startDeleteProducto,
    }
}
