import { useEffect, useState } from 'react'
import { Box, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { KardexTable, useKardex } from '../'
import { useSelector } from 'react-redux'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { convertDate, getNombreMes, getYears, meses, styleButton } from '../../helpers';
import { BarChartOutlined } from '@mui/icons-material';

const initialFormSearch = {
  busqueda: '',
}


export const HomePage = () => {

  const [filtro, setFiltro] = useState('');
  const [filtroMes, setFiltroMes] = useState(getNombreMes(new Date()));
  const [filtroYear, setFiltroYear] = useState(new Date().getFullYear());
  const [formSearch, setFormSearch] = useState(initialFormSearch)
  const [allRows, setAllRows] = useState([]);
  const { startSearchKardex, startValidarKardexRenovados,startRenovarInventario } = useKardex();
  const { busquedas } = useSelector(state => state.kardex);
  const { isBtnRenovarActive } = useSelector(state => state.ui);

  useEffect(() => {
    const { busqueda } = formSearch;
    if (filtro) {
      const timer = setTimeout(() => {
        startSearchKardex({ busqueda, filtro });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formSearch, filtro]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearchKardex({ filtroMes, filtroYear });
    }, 500);
    return () => clearTimeout(timer);
  }, [filtroMes, filtroYear]);

  useEffect(() => {
    setAllRows(busquedas);
  }, [busquedas]);

  useEffect(() => {
    startValidarKardexRenovados();
  }, [])

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
      [target.name]: target.value
    })
  }

  const onRenovarKardex = () => {
    startRenovarInventario();
  }

  const handleExportToPDF = async () => {
    const doc = new jsPDF();
    const fechaActual = new Date();
    // Agregar el título
    doc.setFontSize(24);
    doc.text(`Inventario hasta el ${fechaActual.getDay()} de ${filtroMes} del ${filtroYear}`, doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(20);

    doc.autoTable({
      head: [
        ['Producto', 'Último ingreso', 'Costo', 'Compras', 'Ventas', 'Saldo'],
      ],
      body: allRows.map((row) => [
        row.producto,
        convertDate(row.fecha),
        row.costo.toFixed(2),
        row.compras.toFixed(2),
        row.ventas.toFixed(2),
        row.saldo.toFixed(2),
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
    doc.save(`Inventario-${filtroMes}-${filtroYear}.pdf`);
  };

  return (
    <Card sx={{ p: 2, height: '92%' }} display={'flex'}
      className='animate__animated animate__fadeIn animate__faster'>

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
              <InputLabel id="filtro-select-label">filtro</InputLabel>
              <Select
                labelId="filtro-select-label"
                id="filtro-simple-select"
                value={filtro}
                label="filtro"
                onChange={handleChange}
              >
                <MenuItem value={'producto'}>Producto</MenuItem>
                <MenuItem value={'fecha'}>Fecha</MenuItem>
                {/* <MenuItem value={'saldo'}>Saldo</MenuItem> */}
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
          {
            (isBtnRenovarActive)?
            <Button
              variant="outlined"
              onClick={onRenovarKardex}
              sx={styleButton.verde}
            >
              <Typography fontSize={15} fontWeight={450}>Renovar mes</Typography>
            </Button> : ''
          }
          <Button
            variant="outlined"
            startIcon={<BarChartOutlined/>}
            onClick={handleExportToPDF}
            sx={styleButton.sepia}
          >
            <Typography fontSize={15} fontWeight={450}>Generar reporte</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid padding={2}>
        <KardexTable />
      </Grid>
    </Card>
  )
}
