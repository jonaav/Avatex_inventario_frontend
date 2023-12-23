import { SaveAltOutlined } from "@mui/icons-material";
import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { ProveedoresTable } from "../";
import { useEffect, useState } from "react";
import { useProveedores } from "../hooks/useProveedores";
import { styleButton } from "../../helpers";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useValidateForm } from "../../hooks";

const initialFormSearch = {
  busqueda: '',
}

export const ProveedoresPage = () => {

  const [formValuesSearch, setFormValuesSearch] = useState(initialFormSearch)
  const { startAddProveedor, startSearchProveedores } = useProveedores();
  const { proveedores } = useSelector(state => state.proveedor);
  const { register, handleSubmit, formState:{errors}, reset} = useForm();
  const { nombreProvValidate } = useValidateForm();

  useEffect(() => {
    const timer = setTimeout(() => {
      startSearchProveedores(formValuesSearch);
    }, 500);
    return () => clearTimeout(timer); 
  }, [formValuesSearch, proveedores]);

  const onSubmit = handleSubmit(async (data) => {

    await startAddProveedor(data);
    reset();
  })

  const onSearchChange = ({ target }) => {
    setFormValuesSearch({
      ...formValuesSearch,
      [target.name]: target.value,
    })
  }

  return (

    <Card sx={{ p: 2, height: '92%' }} display={'flex'}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid container padding={2} spacing={2} display={'flex'} justifyContent={'space-evenly'}
        alignItems={'start'}>
        <Grid item xs={12} md={9} lg={5} paddingTop={2}>
          <form onSubmit={onSubmit} >
            <Grid container className="form-group " rowGap={2} justifyContent={'flex-end'}>
              <Grid item xs={12} >
                <Typography fontSize={30} fontWeight={450}>Nuevo Proveedor</Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography fontSize={16} fontWeight={400}>Nombre</Typography>
                <TextField
                  type="text"
                  size="small"
                  className={`form-control`}
                  placeholder="Nombre del proveedor"
                  name="nombre"
                  autoComplete="off"
                  {...register('nombre', nombreProvValidate)}
                />
                {
                  errors.nombre && <Typography color={'rojo.main'}>{errors.nombre.message}</Typography>
                }
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={16} fontWeight={400}>N° de cuenta</Typography>
                <TextField
                  type="text"
                  size="small"
                  className={`form-control`}
                  placeholder="Numero de cuenta"
                  name="numCuenta"
                  autoComplete="off"
                  {...register('numCuenta')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={16} fontWeight={400}>Banco</Typography>
                <TextField
                  type="text"
                  size="small"
                  className={`form-control`}
                  placeholder="Banco"
                  name="banco"
                  autoComplete="off"
                  {...register('banco')}
                />
              </Grid>
              <Button
                type="submit"
                variant="outlined"
                startIcon={<SaveAltOutlined />}
                sx={styleButton.verde}
              >
                <Typography fontSize={15} fontWeight={450}>Guardar</Typography>
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12} md={9} lg={6}>
          <Grid container spacing={1} flexDirection={'column'}>
            <Grid item display={'flex'} alignItems={'center'} columnGap={1}>
              <Typography fontSize={16} fontWeight={400}>Busqueda:</Typography>
              <form style={{ display: 'flex' }}>
                <input
                  type="search"
                  className={`form-control`}
                  placeholder="Nombre"
                  name="busqueda"
                  autoComplete="on"
                  value={formValuesSearch.busqueda}
                  onChange={onSearchChange}
                />
              </form>
            </Grid>
            <Grid item display={'flex'}>
              <ProveedoresTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Card>

  )
}
