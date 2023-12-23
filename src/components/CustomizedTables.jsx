import { DeleteOutlineOutlined, TextSnippetOutlined } from '@mui/icons-material';
import {
  TableRow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  colors,
  IconButton
} from '@mui/material';
import { useState } from 'react';

const columns = [
  {
    id: 'code',
    label: 'Codigo',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'product',
    label: 'Producto',
    minWidth: 150,
    align: 'center'
  },
  {
    id: 'date',
    label: 'Fecha de venta',
    minWidth: 150,
    align: 'center',
  },
  {
    id: 'total',
    label: 'Total',
    minWidth: 150,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'options',
    label: 'Opciones',
    minWidth: 150,
    align: 'center',
  },
];

function createData(product, code, date, total, options) {
  return { product, code, date, total, options };
}

const rows = [
  createData('Razo', 'IN12', '06/08/23', 4, 'a'),
  createData('Polystel', 'CN312', '06/08/23', 20, 'a'),
  createData('Polipima', 'IT43', '06/08/23', 8, 'a'),
  createData('Cardiff', 'US234', '06/08/23', 30, 'a'),
  createData('Andina', 'CA34', '06/08/23', 18, 'a'),
  createData('Polar', 'AU24', '06/08/23', 10, 'a'),
  createData('Belur', 'DE256', '06/08/23', 6, 'a'),
  createData('Polipima gold', 'IE23', '06/08/23', 12, 'a'),
  createData('Razo', 'MX62', '06/08/23', 4, 'a'),
  createData('Razo', 'JP52', '06/08/23', 4, 'a'),
  createData('Polipima', 'FR13', '06/08/23', 8, 'a'),
  createData('Poliseda', 'GB231', '06/08/23', 3, 'a'),
  createData('Polipima', 'RU22', '06/08/23', 8, 'a'),
  createData('Poliseda', 'NG77', '06/08/23', 3, 'a'),
  createData('Poliseda', 'BR58', '06/08/23', 3, 'a'),
];

export const CustomizedTables = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper sx={{ width: '100%', height: '100%', border: '1.5px solid #ccc' }}>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ backgroundColor: 'azul.primary', color: 'blanco.main' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'fondo.primary' }}>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === 'options')
                        return <TableCell
                          key={column.id} align={column.align}
                        >
                          <IconButton>
                            <TextSnippetOutlined sx={{ color: 'azul.main' }} />
                          </IconButton>
                          <IconButton>
                            <DeleteOutlineOutlined sx={{ color: 'error.main' }} />
                          </IconButton>
                        </TableCell>
                      return (
                        <TableCell key={column.id} align={column.align} >
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination sx={{ backgroundColor: 'azul.primary', color: 'blanco.main' }}
        rowsPerPageOptions={[7, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={'Numero de filas'}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
