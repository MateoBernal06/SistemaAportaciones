export const PrivateRoute = ({ children }) => {

    const autenticado = localStorage.getItem('token')

    return (autenticado) ? children : <Navigate to="/" />
}

