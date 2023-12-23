import { DeleteOutlined, FindInPageOutlined, PostAddOutlined } from '@mui/icons-material';
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
import { useState } from 'react';
import { useCompras, InfoCompraModal } from '../';
import { useSelector } from 'react-redux';
import { convertDate } from '../../helpers';
import { useUiStore } from '../../hooks';
import { AddFacturaModal } from './addFacturaModal';

const dataTitle = {
  fecha: {
    id: 'fecha',
    label: 'Fecha de compra',
  },
  factura: {
    id: 'factura',
    label: 'Factura',
  },
  proveedor: {
    id: 'proveedor',
    label: 'Proveedor',
  },
  pagado: {
    id: 'pagado',
    label: 'Pagado',
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

export const ComprasTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const { openInfoModal, openModalAddFactura } = useUiStore();
  const { startDeleteCompra, startSetCompraActiva } = useCompras();
  const { busquedas } = useSelector(state => state.compra);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const verInfoCompra = (compra) => {
    startSetCompraActiva(compra);
    openInfoModal();
  }

  const AnularCompra = (compra) => {
    startDeleteCompra(compra)
    // Verificar si la página actual está fuera de rango
    const lastPage = Math.max(0, Math.ceil((busquedas.length - 1) / rowsPerPage) - 1);
    if (page > lastPage) {
      setPage(lastPage);
    }
  }

  const agregarFactura = (compra) => {
    startSetCompraActiva(compra);
    openModalAddFactura();
  }

  return (
    <Paper sx={{ width: '100%', height: '100%', border: '1.5px solid #ccc' }}>
      <TableContainer sx={{ height: '100%' }}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              <TableCell sx={stylesHeader} key={dataTitle.fecha.id}
              >{dataTitle.fecha.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.factura.id}
              >{dataTitle.factura.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.proveedor.id}
              >{dataTitle.proveedor.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.pagado.id}
              >{dataTitle.pagado.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.total.id}
              >{dataTitle.total.label}</TableCell>
              <TableCell sx={stylesHeader} key={dataTitle.opciones.id}
              >{dataTitle.opciones.label}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'fondo.primary' }}>
            {busquedas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((compra, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                    <TableCell key={dataTitle.fecha.id}>
                      {convertDate(compra.fecha)}
                    </TableCell>
                    <TableCell key={dataTitle.factura.id}>
                      {compra.factura}
                    </TableCell>
                    <TableCell key={dataTitle.proveedor.id}>
                      {compra.proveedor}
                    </TableCell>
                    <TableCell key={dataTitle.pagado.id}>
                      {compra.pagado}
                    </TableCell>
                    <TableCell key={dataTitle.total.id}>
                      {compra.total.toFixed(2)}
                    </TableCell>
                    <TableCell key={dataTitle.opciones.id}>
                      <Tooltip title="Agregar Factura">
                        <IconButton onClick={()=>agregarFactura(compra)}>
                          <PostAddOutlined sx={{ color: 'verde.primary' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Más información">
                        <IconButton onClick={() => verInfoCompra(compra)}>
                          <FindInPageOutlined sx={{ color: 'indigo.secondary' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => AnularCompra(compra)}>
                          <DeleteOutlined sx={{ color: 'error.main' }} />
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
        rowsPerPageOptions={[7, 25, 100]}
        component="div"
        count={busquedas.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={'Número de filas'}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddFacturaModal/>
      <InfoCompraModal />
    </Paper>
  );
}


