import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useProveedores } from "../hooks/useProveedores";
import { useSelector } from "react-redux";
import { styleHeader, stylePagination } from "../../helpers";


const columns = [
    {
        id: 'nombre',
        label: 'Proveedores',
        minWidth: 150,
    },
    {
        id: 'numCuenta',
        label: 'N° de Cuenta',
        minWidth: 150,
    },
    {
        id: 'banco',
        label: 'Banco',
        minWidth: 150,
    },
    {
        id: 'opciones',
        label: 'Opciones',
        minWidth: 100,
    },
];


export const ProveedoresTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const { startLoadProveedores, startDeleteProveedor } = useProveedores();
    const { busquedas } = useSelector(state => state.proveedor);

    useEffect(() => {
        startLoadProveedores();
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onDeleteProveedorFromList = (proveedor) => {
        startDeleteProveedor(proveedor);
        // Verificar si la página actual está fuera de rango
        const lastPage = Math.max(0, Math.ceil((busquedas.length - 1) / rowsPerPage) - 1);
        if (page > lastPage) {
          setPage(lastPage);
        }
    }

    return (
        <Paper sx={{ width: '100%', height: '100%', border: '1.5px solid #ccc' }}>
            <TableContainer sx={{ height: '100%' }}>
                <Table stickyHeader aria-label="proveedoresTable" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell sx={styleHeader} key={column.id}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'fondo.primary' }}>
                        {busquedas
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            if (column.id === 'opciones')
                                                return <TableCell key={column.id} >
                                                    <Tooltip title="Eliminar">
                                                        <IconButton onClick={() => onDeleteProveedorFromList(row)}>
                                                            <DeleteOutlineOutlined sx={{ color: 'error.main' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={stylePagination}
                rowsPerPageOptions={[8, 25, 100]}
                component="div"
                count={busquedas.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage={'Número de filas'}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
