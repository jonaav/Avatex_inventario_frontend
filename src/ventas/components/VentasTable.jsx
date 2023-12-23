import { DeleteOutlined, FindInPageOutlined } from '@mui/icons-material';
import {
  TableRow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  IconButton,
  Tooltip
} from '@mui/material';
import { useEffect, useState } from 'react';
import { InfoVentaModal, useVentas } from '../';
import { useSelector } from 'react-redux';
import { convertDate } from '../../helpers';
import { useUiStore } from '../../hooks';


const dataTitle = {
  indice: {
    id: 'id',
    label: 'N°',
  },
  productos: {
    id: 'productos',
    label: 'Productos',
  },
  fecha: {
    id: 'fecha',
    label: 'Fecha de venta',
  },
  total: {
    id: 'total',
    label: 'Total',
  },
  opciones: {
    id: 'opciones',
    label: 'Opciones',
  },
};

const stylesHeader = {
  backgroundColor: 'azul.primary',
  color: 'blanco.main',
  minWidth: 150,
}

export const VentasTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const { openInfoModal } = useUiStore();
  const { startCancelVenta, startSetVentaActiva } = useVentas();
  const { busquedas } = useSelector(state => state.venta);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const verInfoVenta = (venta) => {
    startSetVentaActiva(venta);
    openInfoModal();
  }

  const AnularVenta = (venta) => {
    startCancelVenta(venta)
    // Verificar si la página actual está fuera de rango
    const lastPage = Math.max(0, Math.ceil((busquedas.length - 1) / rowsPerPage) - 1);
    if (page > lastPage) {
      setPage(lastPage);
    }
  }


  return (
    <Paper sx={{ width: '100%', height: '100%', border: '1.5px solid #ccc' }}>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="ventasTable" >
          <TableHead>
            <TableRow>
              <TableCell sx={stylesHeader} key={dataTitle.fecha.id}
              >{dataTitle.fecha.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.total.id}
              >{dataTitle.total.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.opciones.id}
              >{dataTitle.opciones.label}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'fondo.primary' }}>
            {busquedas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((venta, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                    <TableCell key={dataTitle.fecha.id} >
                      {convertDate(venta.fecha)}
                    </TableCell>
                    <TableCell key={dataTitle.total.id} >
                      {venta.total.toFixed(2)}
                    </TableCell>
                    <TableCell key={dataTitle.opciones.id} >
                      <Tooltip title="Más información">
                        <IconButton onClick={() => verInfoVenta(venta)}>
                          <FindInPageOutlined sx={{ color: 'indigo.secondary' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => AnularVenta(venta)}>
                          <DeleteOutlined sx={{ color: 'rojo.main' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination sx={{ backgroundColor: 'azul.primary', color: 'blanco.main' }}
        rowsPerPageOptions={[8, 25, 100]}
        component="div"
        count={busquedas.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={'Número de filas'}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <InfoVentaModal/>
    </Paper>
  );
}
