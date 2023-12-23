import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
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
    Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useProductos } from "../hooks/useProductos";
import { useSelector } from "react-redux";
import { styleHeader, stylePagination } from "../../helpers";


const columns = [
    {
        id: 'nombre',
        label: 'Productos',
        minWidth: 150,
    },
    {
        id: 'opciones',
        label: 'Opciones',
        minWidth: 100,
    },
];


export const ProductosTable = () => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const { startLoadProductos, startDeleteProducto, startSelectProducto } = useProductos();
    const { busquedas } = useSelector(state => state.producto);

    useEffect(() => {
        startLoadProductos();
    }, [])

    const handleChangePage = (event, newPage) => {
          setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onDeleteProductFromList = (producto) => {
        startDeleteProducto(producto)
        // Verificar si la página actual está fuera de rango
        const lastPage = Math.max(0, Math.ceil((busquedas.length - 1) / rowsPerPage) - 1);
        if (page > lastPage) {
          setPage(lastPage);
        }
    }


    const onSelectProducto = (producto) => {
        startSelectProducto(producto);
    }

    return (
        <Paper sx={{ width: '100%', height: '100%', border: '1.5px solid #ccc' }}>
            <TableContainer sx={{ height: '100%' }}>
                <Table stickyHeader aria-label="productosTable" >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell sx={styleHeader} key={column.id} >
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
                                                    <Tooltip title="Editar">
                                                        <IconButton onClick={() => onSelectProducto(row)}>
                                                            <EditOutlined sx={{ color: 'orange' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Eliminar">
                                                        <IconButton onClick={() => onDeleteProductFromList(row)}>
                                                            <DeleteOutlineOutlined sx={{ color: 'rojo.main' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} >
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
