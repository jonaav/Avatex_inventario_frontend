
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { useCompras } from '../compras';
import { useVentas } from '../ventas';

export const ListaProductosTable = ({ productos, tipo }) => {

  const { startDeleteProductoFromCompra } = useCompras();
  const { startDeleteProductoFromVenta } = useVentas();

  const deleteProductFromList = (producto) => {
    console.log(`Eliminando ${producto}`)
    if(tipo==='compra'){
      startDeleteProductoFromCompra(producto);
    }else{
      startDeleteProductoFromVenta(producto)
    }

  }

  const stylesHeader = {
    backgroundColor: 'azul.primary',
    color: 'blanco.main',
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%' }}>
      <Table aria-label="listaProductos">
        <TableHead>
          <TableRow>
            <TableCell sx={stylesHeader} >Producto</TableCell>
            <TableCell sx={stylesHeader} >Metros</TableCell>
            <TableCell sx={stylesHeader} >Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell >{producto.nombre}</TableCell>
              <TableCell >{producto.cantidad}</TableCell>
              <TableCell>
                <IconButton onClick={() => deleteProductFromList(producto)}>
                  <DeleteOutlineOutlined sx={{ color: 'error.main' }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}