import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../contabilidad"
import { VentasPage } from "../ventas"
import { ComprasPage } from "../compras"
import { ProductosPage } from "../productos"
import { ProveedoresPage } from "../proveedores"
import { ContabilidadLayout } from "../layout/ContabilidadLayout"

export const AppRouter = () => {
  return (
    <ContabilidadLayout>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/ventas' element={<VentasPage />} />
        <Route path='/compras' element={<ComprasPage />} />
        <Route path='/productos' element={<ProductosPage />} />
        <Route path='/proveedores' element={<ProveedoresPage />} />

        {/* Default */}
        <Route path='/*' element={<Navigate to='/' />} />
      </Routes>
    </ContabilidadLayout>
  )
}
