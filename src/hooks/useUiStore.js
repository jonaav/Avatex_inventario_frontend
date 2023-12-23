import { useDispatch, useSelector } from "react-redux";
import { 
    onCloseCompraModal, 
    onCloseInfoModal, 
    onCloseModalAddFactura, 
    onCloseVentaModal, 
    onOpenCompraModal, 
    onOpenInfoModal, 
    onOpenModalAddFactura, 
    onOpenVentaModal ,
} from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isNewVentaModalOpen,
        isNewCompraModalOpen,
        isInfoModalOpen,
        isAddFacturaModalOpen,
    } = useSelector(state => state.ui);

    const openVentaModal = () => {
        dispatch(onOpenVentaModal());
    }
    const closeVentaModal = () => {
        dispatch(onCloseVentaModal());
    }
    const openCompraModal = () => {
        dispatch(onOpenCompraModal());
    }
    const closeCompraModal = () => {
        dispatch(onCloseCompraModal());
    }
    const openInfoModal = () => {
        dispatch(onOpenInfoModal());
    }
    const closeInfoModal = () => {
        dispatch(onCloseInfoModal());
    }
    const openModalAddFactura = () => {
        dispatch(onOpenModalAddFactura());
    }
    const closeModalAddFactura = () => {
        dispatch(onCloseModalAddFactura());
    }


    return {
        isNewVentaModalOpen,
        isNewCompraModalOpen,
        isInfoModalOpen,
        isAddFacturaModalOpen,
        openVentaModal,
        closeVentaModal,
        openCompraModal,
        closeCompraModal,
        openInfoModal,
        closeInfoModal,
        openModalAddFactura,
        closeModalAddFactura
    }
}
