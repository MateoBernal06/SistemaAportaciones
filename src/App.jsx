// estilos - bootstrap - css
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css'
import './styles/style_dashboard.css'


import Dashboard from './layout/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/Forgot'
import { NotFound } from './paginas/NotFound'

import Listar from './paginas/Listar'
import Visualizar from './paginas/Visualizar'
import Crear from './paginas/Crear'
import Actualizar from './paginas/Actualizar'
import Perfil from './paginas/Perfil'
import { Confirmar } from './paginas/Confirmar'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import Restablecer from './paginas/Restablecer'
import PrivateRouteWithRole from './routes/PrivateRouteWithRole'
import { AportacionesProvider } from './context/AportacionesProvider'


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AportacionesProvider>
            <Routes>

              <Route index element={<LandinPage />} />

              <Route path='/' element={<Auth />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgot/:id' element={<Forgot />} />
                <Route path='confirmar/:token' element={<Confirmar />} />
                <Route path='recuperar-password/:token' element={<Restablecer />} />
                <Route path='*' element={<NotFound />} />
              </Route>

              <Route path='dashboard/*' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route index element={<Perfil />} />
                <Route path='listar' element={<Listar />} />
                <Route path='visualizar/:id' element={<Visualizar />} />
                <Route path='crear' element={
                  <PrivateRouteWithRole>
                    <Crear />
                  </PrivateRouteWithRole>
                }/>
                <Route path='actualizar/:id' element={<Actualizar />} />
              </Route>
            </Routes>
          </AportacionesProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App