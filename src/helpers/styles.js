
import Swal from "sweetalert2";

export const styleHeader = {
    backgroundColor: 'azul.primary',
    color: 'blanco.main',
    minWidth: 150,
    fontSize: '18px'
}

export const stylePagination = {
    backgroundColor: 'azul.primary',
    color: 'blanco.main',
    fontSize: '16px',
    '& .MuiTablePagination-selectLabel': {
        marginTop: 'auto'
    },
    '& .MuiSelect-icon': {
        color: 'blanco.main'
    },
}

export const buttonSwalSaved = (msg) => {
    Swal.fire({
        title: 'Guardado',
        text: msg,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
}
export const buttonSwalDeleted = (msg) => {
    Swal.fire({
        title: 'Eliminado',
        text: msg,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
}

export const buttonSwalError = (msg) => {
    Swal.fire({
        title: 'Error al guardar',
        text: msg,
        icon: 'error',
        customClass: {
            confirmButton: 'custom-confirm-button',
        },
        buttonsStyling: false,
    });
}

export const styleButton = {
    verde: {
        borderRadius: 2,
        backgroundColor: 'verde.primary',
        borderColor: 'verde.secondary',
        color: "blanco.main",
        '&:hover': {
            backgroundColor: 'verde.secondary',
            borderColor: 'verde.primary',
        }
    },
    indigo: {
        borderRadius: 2,
        backgroundColor: 'indigo.primary',
        borderColor: 'indigo.secondary',
        color: "blanco.main",
        '&:hover': {
            backgroundColor: 'indigo.secondary',
            borderColor: 'indigo.primary',
        },
    },
    sepia: {
        borderRadius: 2,
        borderColor: 'sepia.secondary',
        backgroundColor: 'sepia.primary',
        color: "blanco.main",
        '&:hover': {
            borderColor: 'sepia.primary',
            backgroundColor: 'sepia.secondary'
        },
    },
    rojo: {
        borderRadius: 2,
        backgroundColor: 'rojo.main',
        borderColor: 'rojo.primary',
        color: 'blanco.main',
        '&:hover': {
            backgroundColor: 'rojo.primary',
            borderColor: 'rojo.main',
        },
    }
}