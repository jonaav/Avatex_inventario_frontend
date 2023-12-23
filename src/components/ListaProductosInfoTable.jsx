
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ListaProductosInfoTable = ({ productos }) => {

  const stylesHeader = {
    backgroundColor: 'azul.primary',
    color: 'blanco.main',
    fontSize: '18px'
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table aria-label="listaProductos">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={stylesHeader} >Producto</TableCell>
            <TableCell align="center" sx={stylesHeader} >Metros</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell align="center" sx={{ fontSize: '16px' }}>{producto.nombre}</TableCell>
              <TableCell align="center" sx={{ fontSize: '16px' }}>{producto.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}