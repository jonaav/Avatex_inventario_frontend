import {
  TableRow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useKardex } from '../hooks/useKardex';
import { convertDate } from '../../helpers';

const dataTitle = {
  producto: {
    id: 'producto',
    label: 'Producto',
  },
  fecha: {
    id: 'fecha',
    label: 'Último ingreso',
  },
  costo: {
    id: 'costo',
    label: 'Costo',
  },
  compras: {
    id: 'compras',
    label: 'Compra (mts)',
  },
  ventas: {
    id: 'ventas',
    label: 'Venta (mts)',
  },
  saldo: {
    id: 'saldo',
    label: 'Saldo',
  }
};

const stylesHeader = {
  backgroundColor: 'azul.primary',
  color: 'blanco.main',
  minWidth: 150,
}

export const KardexTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { busquedas } = useSelector(state => state.kardex);

  useEffect(() => {
    setPage(0);
  }, [busquedas]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', height: '100%', border: '1.5px solid #ccc' }}>
        <TableContainer sx={{ height: '100%' }}>
          <Table stickyHeader aria-label="kardexTable" >
            <TableHead>
              <TableRow>
                <TableCell sx={stylesHeader} key={dataTitle.producto.id}
                >{dataTitle.producto.label}</TableCell>
                <TableCell sx={stylesHeader} key={dataTitle.fecha.id}
                >{dataTitle.fecha.label}</TableCell>
                <TableCell sx={stylesHeader} key={dataTitle.costo.id}
                >{dataTitle.costo.label}</TableCell>
                <TableCell sx={stylesHeader} key={dataTitle.compras.id}
                >{dataTitle.compras.label}</TableCell>
                <TableCell sx={stylesHeader} key={dataTitle.ventas.id}
                >{dataTitle.ventas.label}</TableCell>
                <TableCell sx={stylesHeader} key={dataTitle.saldo.id}
                >{dataTitle.saldo.label}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ backgroundColor: 'fondo.primary' }}>
              {busquedas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                      <TableCell key={dataTitle.producto.id}>
                        {row.producto}
                      </TableCell>
                      <TableCell key={dataTitle.fecha.id}>
                        {convertDate(row.fecha)}
                      </TableCell>
                      <TableCell key={dataTitle.costo.id}>
                        {row.costo.toFixed(2)}
                      </TableCell>
                      <TableCell key={dataTitle.compras.id}>
                        {row.compras.toFixed(2)}
                      </TableCell>
                      <TableCell key={dataTitle.ventas.id}>
                        {row.ventas.toFixed(2)}
                      </TableCell>
                      <TableCell key={dataTitle.saldo.id}>
                        {row.saldo.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ backgroundColor: 'azul.primary', color: 'blanco.main' }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={busquedas.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={'Número de filas'}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
