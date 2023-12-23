import { useDispatch } from "react-redux";
import { onAddKardexToBusquedas, onLoadKardex, onSearchKardex } from "../";
import { inventarioApi } from "../../api";
import { getNombreMes } from "../../helpers";
import { onActiveBtnRenovar } from "../../store/ui/uiSlice";


export const useKardex = () => {

    const dispatch = useDispatch();

    const startSearchKardex = async ({ busqueda = '', filtro = '', filtroMes, filtroYear }) => {
        if (filtro) {
            dispatch(onSearchKardex({ busqueda, filtro }))
        } else {
            const mes = filtroMes.charAt(0).toUpperCase() + filtroMes.slice(1);
            const year = filtroYear.toString();
            try {
                const { data } = await inventarioApi.get(`/inventario/${mes}/${year}`);
                const { kardexList } = data;
                dispatch(onLoadKardex(kardexList));
            } catch (error) {
                console.log(error)
            }
        }
    }
    const startLoadKardex = async () => {
        const fecha = new Date();
        const mes = getNombreMes(fecha);
        const year = fecha.getFullYear().toString();
        try {
            const { data } = await inventarioApi.get(`/inventario/${mes}/${year}`);
            const { kardexList } = data;
            dispatch(onLoadKardex(kardexList));
        } catch (error) {
            console.log(error)
        }
    }
    const startValidarKardexRenovados = async () => {
        try {
            const { data } = await inventarioApi.get(`/inventario/validarRenovacion`);
            const { count } = data;
            dispatch(onActiveBtnRenovar({count}));
        } catch (error) {
            console.log(error)
        }
    }
    const startRenovarInventario = async () => {
        try {
            const { data } = await inventarioApi.get(`/inventario/renovar`);
            const { kdxRenovados, count } = data;
            dispatch(onAddKardexToBusquedas(kdxRenovados));
            dispatch(onActiveBtnRenovar({count}));
        } catch (error) {
            console.log(error)
        }
    }


    return {
        startSearchKardex,
        startLoadKardex,
        startValidarKardexRenovados,
        startRenovarInventario,
    }
}
