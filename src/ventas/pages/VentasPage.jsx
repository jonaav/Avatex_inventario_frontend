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
  Typography,
} from "@mui/material"
import { AddOutlined, BarChartOutlined } from "@mui/icons-material"
import { useUiStore } from "../../hooks";
import { RegistrarVentaModal, VentasTable, useVentas } from "../";
import { getNombreMes, getYears, meses, styleButton } from "../../helpers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useProductos } from "../../productos";

const initialFormSearch = {
  busqueda: '',
}

export const VentasPage = () => {

  const [filtro, setFiltro] = useState('');
  const [filtroMes, setFiltroMes] = useState(getNombreMes(new Date()));
  const [filtroYear, setFiltroYear] = useState(new Date().getFullYear());
  const { openVentaModal } = useUiStore();
  const { startSearchVentas, startLoadVentas } = useVentas();
  const { startLoadProductos } = useProductos();
  const [formSearch, setFormSearch] = useState(initialFormSearch)
  const { ventas } = useSelector(state => state.venta);


  useEffect(() => {
    const { busqueda } = formSearch;
    if (filtro) {
      const timer = setTimeout(() => {
        startSearchVentas({ busqueda, filtro });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [formSearch, filtro]);

  useEffect(() => {
    if (filtroMes && filtroYear) {
      const timer = setTimeout(() => {
        startLoadVentas({ filtroMes, filtroYear });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [filtroMes, filtroYear]);

  useEffect(() => {
    const { busqueda } = formSearch;
    startSearchVentas({ busqueda, filtro });
  }, [ventas])

  useEffect(() => {
    startLoadProductos();
  }, [startLoadProductos])

  const handleClickNew = (event) => {
    openVentaModal();
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

  return (
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
                <MenuItem value={'fecha'}>Fecha</MenuItem>
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
            <Typography fontSize={15} fontWeight={450}>Nueva venta</Typography>
          </Button>
        </Grid>

      </Grid>
      <RegistrarVentaModal />
      <Grid padding={2} >
        <VentasTable />

      </Grid>
    </Card>
  )
}
