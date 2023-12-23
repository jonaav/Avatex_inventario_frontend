import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useUiStore } from '../../hooks';

import { AddOutlined, BarChartOutlined } from '@mui/icons-material';
import { ComprasTable, useCompras } from '../';
import { RegistrarCompraModal } from '../';
import { useSelector } from 'react-redux';
import { convertDate, getNombreMes, getYears, meses, styleButton } from '../../helpers';
import { useProductos } from '../../productos/hooks/useProductos';
import { useProveedores } from '../../proveedores/hooks/useProveedores';
import jsPDF from 'jspdf';

const initialFormSearch = {
  busqueda: '',
}

export const ComprasPage = () => {

  const [filtro, setFiltro] = useState('');
  const [filtroMes, setFiltroMes] = useState(getNombreMes(new Date()));
  const [filtroYear, setFiltroYear] = useState(new Date().getFullYear());
  const { openCompraModal } = useUiStore();
  const { startSearchCompras, startLoadCompras } = useCompras();
  const { startLoadProductos } = useProductos();
  const { startLoadProveedores } = useProveedores();
  const [formSearch, setFormSearch] = useState(initialFormSearch)
  const { compras, busquedas } = useSelector(state => state.compra);
  const [allRows, setAllRows] = useState([]);

  useEffect(() => {
    const { busqueda } = formSearch;
    if (filtro) {
      const timer = setTimeout(() => {
        startSearchCompras({ busqueda, filtro });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formSearch, filtro]);

  useEffect(() => {
    if (filtroMes && filtroYear) {
      const timer = setTimeout(() => {
        startLoadCompras({ filtroMes, filtroYear });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [filtroMes, filtroYear]);

  useEffect(() => {
    setAllRows(busquedas);
  }, [busquedas]);

  useEffect(() => {
    startLoadProductos();
    startLoadProveedores();
  }, [startLoadProductos, startLoadProveedores])

  const handleClickNew = (event) => {
    openCompraModal();
  }
  const handleChange = (event) => {
    setFiltro(event.target.value);
  };
  const handleChangeMes = (event) => {
    setFiltroMes(event.target.value);
  };
  const handleChangeYear = (event) => {
    setFiltroYear(event.target.value);
  };

  const onSearchChange = ({ target }) => {
    setFormSearch({
      ...formSearch,
      [target.name]: target.value,
      filtro: filtro,
    })
  }

  const handleExportToPDF = async () => {
    const doc = new jsPDF();
    const fechaActual = new Date();
    // Agregar el título
    doc.setFontSize(24);
    doc.text(`Compras hasta el ${fechaActual.getDay()} de ${filtroMes} del ${filtroYear}`, doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(20);

    doc.autoTable({
      head: [
        ['Fecha de compra', 'Factura', 'Proveedor', 'Pagado', 'Total'],
      ],
      body: allRows.map((row) => [
        convertDate(row.fecha),
        row.factura,
        row.proveedor,
        row.pagado,
        row.total.toFixed(2),
      ]),
      didDrawPage: function (data) {
        // Establecer el número de página en el pie de página (lado derecho)
        const pageHeight = doc.internal.pageSize.height - 10; // 10 es el margen inferior
        const pageNumberText = data.pageNumber.toString();

        // Calcular la posición x para que el texto aparezca en el lado derecho
        const textWidth = doc.getStringUnitWidth(pageNumberText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const xPosition = doc.internal.pageSize.width - data.settings.margin.right - textWidth;

        // Agregar el texto al lado derecho
        doc.text(pageNumberText, xPosition, pageHeight);

      },
      margin: { top: 20, bottom: 30 }
    });

    // Guardar el PDF
    doc.save(`Compras-${filtroMes}-${filtroYear}.pdf`);
  };

  return (
    <>
      <Card sx={{ p: 2, height: '92%' }} display={'flex'}
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container padding={2} justifyContent={'space-between'}>
          <Grid item display={'flex'} alignItems={'center'} columnGap={1}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ display: 'flex' }}>
                <InputLabel id="filtroMes-select-label">Mes</InputLabel>
                <Select
                  labelId="filtroMes-select-label"
                  id="filtroMes-select"
                  value={filtroMes}
                  label="Mes"
                  onChange={handleChangeMes}
                >
                  {
                    meses.map((mes) => {
                      return <MenuItem key={mes} value={mes}>{mes}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ display: 'flex' }}>
                <InputLabel id="filtroYear-select-label">Año</InputLabel>
                <Select
                  labelId="filtroYear-select-label"
                  id="filtroYear-select"
                  value={filtroYear}
                  label="Year"
                  onChange={handleChangeYear}
                >
                  {
                    getYears().map((year) => {
                      return <MenuItem key={year} value={year}>{year}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ display: 'flex' }}>
                <InputLabel id="demo-simple-select-label">filtro</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filtro}
                  label="filtro"
                  onChange={handleChange}
                >
                  <MenuItem value={'factura'}>N° Factura</MenuItem>
                  <MenuItem value={'proveedor'}>Proveedor</MenuItem>
                  <MenuItem value={'fecha'}>Fecha</MenuItem>
                  <MenuItem value={'pagado'}>Pagado</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl>
              <TextField id="standard-basic"
                label="Busqueda"
                type='search'
                placeholder='¿Qué desea buscar?'
                name='busqueda'
                autoComplete='on'
                value={formSearch.busqueda}
                onChange={onSearchChange}
              />
            </FormControl>
          </Grid>
          <Grid item display={'flex'} alignItems={'center'} columnGap={1}>
            <Button
              variant="outlined"
              startIcon={<AddOutlined />}
              sx={styleButton.indigo}
              onClick={handleClickNew}
            >
              <Typography fontSize={15} fontWeight={450}> Nueva compra</Typography>
            </Button>
            <Button
              variant="outlined"
              startIcon={<BarChartOutlined />}
              onClick={handleExportToPDF}
              sx={styleButton.sepia}
            >
              <Typography fontSize={15} fontWeight={450}> Reportes</Typography>
            </Button>
          </Grid>

        </Grid>
        <RegistrarCompraModal />
        <Grid padding={2} >
          <ComprasTable />

        </Grid>
      </Card>
    </>
  )
}
