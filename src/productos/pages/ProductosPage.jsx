import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Divider, Grid, TextField, Typography } from '@mui/material'
import { AddOutlined, SaveAltOutlined } from '@mui/icons-material'
import { ProductosTable } from '../'
import { useProductos } from '../hooks/useProductos'
import { styleButton } from '../../helpers'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useValidateForm } from '../../hooks'


const initialFormSearch = {
  busqueda: '',
}

export const ProductosPage = () => {

  const [formValuesSearch, setFormValuesSearch] = useState(initialFormSearch)
  const { startSearchProductos, startSaveProducto, startDeleteSelectProducto } = useProductos();
  const { productos, selected } = useSelector(state => state.producto);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { nombreProdValidate } = useValidateForm();


  useEffect(() => {
    const timer = setTimeout(() => {
      startSearchProductos(formValuesSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [formValuesSearch, productos]);

  useEffect(() => {
    setValue('nombre', selected.nombre);
  }, [selected])


  const onSearchChange = ({ target }) => {
    setFormValuesSearch({
      ...formValuesSearch,
      [target.name]: target.value,
    })
  }

  const onSubmit = handleSubmit(async (data) => {
    await startSaveProducto({id: selected.id, nombre: data.nombre});
    limpiarSelected();
    reset();
  })

  const limpiarSelected = () => {
    startDeleteSelectProducto();
  }


  return (

    <Card sx={{ mb: 1, p: 2 }} display={'flex'}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid container padding={2} spacing={2} display={'flex'} justifyContent={'space-evenly'}
        alignItems={'start'}>
        <Grid item xs={12} md={9} lg={4} paddingTop={2}>
          <form onSubmit={onSubmit} >
            <Grid container className="form-group " rowGap={2} justifyContent={'space-between'}>
              <Grid item xs={12}>
                <Typography fontSize={30} fontWeight={450} color={'azul.primary'}>{(Object.keys(selected).length !== 0) ? 'Editar' : 'Nuevo'} Producto</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={16} fontWeight={400}>Nombre</Typography>
                <TextField
                  type="text"
                  size='small'
                  className={`form-control`}
                  placeholder="Nombre del producto"
                  name="nombre"
                  autoComplete="off"
                  {...register('nombre', nombreProdValidate)}
                />
                {
                  errors.nombre && <Typography color={'rojo.main'}>{errors.nombre.message}</Typography>
                }
              </Grid>
              {/* <Grid item xs={12}>
                <Typography fontSize={16} fontWeight={400}>Codigo</Typography>
                <TextField
                  type="text"
                  size='small'
                  className={`form-control`}
                  placeholder="Nombre del producto"
                  name="codigo"
                  autoComplete="off"
                  {...register('codigo')}
                />
              </Grid> */}
              {
                (Object.keys(selected).length !== 0)?
                <Button
                  variant="outlined"
                  startIcon={<AddOutlined />}
                  sx={styleButton.indigo}
                  onClick={limpiarSelected}
                >
                  <Typography fontSize={15} fontWeight={450}>Nuevo</Typography>
                </Button>:<Divider/>
              }
              <Button
                type='submit'
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
            <Grid item display={'flex'} alignItems={'center'} columnGap={1} >
              <Typography fontSize={16} fontWeight={400}>Busqueda:</Typography>
              <form style={{ display: 'flex' }}>
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Nombre"
                  name="busqueda"
                  autoComplete="on"
                  value={formValuesSearch.busqueda}
                  onChange={onSearchChange}
                />
              </form>
            </Grid>
            <Grid item>
              <ProductosTable />
            </Grid>
          </Grid>
        </Grid>


      </Grid>

    </Card>

  )
}
