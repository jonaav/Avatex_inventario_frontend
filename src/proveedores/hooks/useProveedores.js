import { useDispatch } from "react-redux"
import { onAddProveedor, onDeleteProveedor, onLoadProveedores, onSearchProveedores } from "../store/proveedorSlice";
import { inventarioApi } from "../../api";
import { buttonSwalDeleted, buttonSwalError, buttonSwalSaved, formatNombre } from "../../helpers";
import Swal from "sweetalert2";


export const useProveedores = () => {

    const dispatch = useDispatch();

    const startSearchProveedores = ({ busqueda }) => {
        dispatch(onSearchProveedores({ busqueda }));
    }
    const startLoadProveedores = async () => {
        try {
            const { data } = await inventarioApi.get('/proveedores');
            const proveedores = data.proveedores;
            dispatch(onLoadProveedores(proveedores));
        } catch (error) {
            console.log(error)
        }
    }

    const startAddProveedor = async (proveedor) => {
        // TODO: Registrar Proveedores API
        const {nombre} = proveedor;
        proveedor.nombre = formatNombre(nombre);
        try {
            const { data } = await inventarioApi.post('/proveedores', proveedor);
            if (data.ok) dispatch(onAddProveedor(data.proveedor));
            buttonSwalSaved(data.msg);
        } catch (error) {
            console.log(error)
            buttonSwalError(error.response.data.msg);
        }
    }

    const startDeleteProveedor = async (proveedor) => {
        try {
            const { id, nombre } = proveedor;
            Swal.fire({
                title: `Está seguro?`,
                text: `Los datos de ${nombre} se borrarán`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#207AC9",
                cancelButtonColor: "#C85656",
                confirmButtonText: "Sí, eliminar!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    const { data } = await inventarioApi.delete(`/proveedores/${id}`);
                    if (data.ok) {
                        dispatch(onDeleteProveedor(proveedor));
                        buttonSwalDeleted(data.msg)
                    }
                }
            });
        } catch (error) {
        console.log(error)
        buttonSwalError(error.response.data.msg);
    }

}


return {
    startSearchProveedores,
    startLoadProveedores,
    startAddProveedor,
    startDeleteProveedor,
};

}


