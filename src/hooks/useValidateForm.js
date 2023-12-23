
export const useValidateForm = () => {
    const facturaValidate = {
        required: {
            value: true,
            message: "El campo está vacío"
        },
        minLength: {
            value: 3,
            message: "La factura debe tener al menos 3 caracteres"
        }
    }
    const fechaValidate = {
        required: {
            value: true,
            message: "El campo está vacío"
        },
        // validate: (value) => {
        //     const hoy = new Date();
        //     console.log('msg de error:', value)
        //     if (value.getFullYear() >= 2023) {
        //         return true;
        //     } else {
        //         return 'Error de fecha'
        //     }
        // }
    }
    const proveedorValidate = {
        required: {
            value: true,
            message: "Debe seleccionar un proveedor"
        },
    }
    const productoValidate = {
        required: {
            value: true,
            message: "Debe seleccionar un producto"
        },
    }
    const cantidadValidate = {
        required: {
            value: true,
            message: "Debe agregar una cantidad"
        },
        pattern: {
            value: /^(?:[1-9]\d*(?:[\.,]\d+)?|0[\.,][5-9]\d*)$/,
            message: "La cantidad debe ser mínimo 0.5"
        }
    }
    const precioValidate = {
        required: {
            value: true,
            message: "Debe agregar el precio"
        },
        pattern: {
            value: /^(?:[1-9]\d*|[1-9]\d*(?:[\.,]\d+)?)$/,
            message: "El precio debe ser mayor a S/.1.00"
        }
    }
    const nombreProdValidate = {
        required: {
            value: true,
            message: "El campo está vacío"
        },
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres"
        }
    }
    const nombreProvValidate = {
        required: {
            value: true,
            message: "El campo está vacío"
        },
        minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres"
        }
    }


    return {
        facturaValidate,
        fechaValidate,
        proveedorValidate,
        productoValidate,
        cantidadValidate,
        precioValidate,
        nombreProdValidate,
        nombreProvValidate,
    }
}


