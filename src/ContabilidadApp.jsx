import { BrowserRouter } from "react-router-dom"
import { AppTheme } from "./theme"
import { AppRouter } from "./router/AppRouter"
import { Provider } from "react-redux"
import { store } from "./store"


export const ContabilidadApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppTheme>
          <AppRouter />
        </AppTheme>
      </BrowserRouter>
    </Provider>
  )
}
