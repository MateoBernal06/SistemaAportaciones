import axios from "axios"
import { createContext, useEffect, useState, useContext} from "react"

const AuthContext = createContext()

const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth debe estar dentro del proveedor AuthProvider')
    }
    return context
}

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const perfil = async(token, rol) => {
        try {
            let url = "";
            if(rol === 'tesorero'){
                url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            }else if(rol ==='aportante'){
                url = `${import.meta.env.VITE_BACKEND_URL}/aportante/perfil`
            }
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
            localStorage.setItem("auth", JSON.stringify(respuesta.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const rol = localStorage.getItem('rol')
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
        if (token && rol) {
            perfil(token, rol)
        }
    }, [])

    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tesorero/${datos.id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options);
            const updatedAuth = {
                ...auth,
                ...datos,
                msg: respuesta.data.msg
            };
            setAuth(updatedAuth);
            localStorage.setItem("auth", JSON.stringify(updatedAuth));
            return { respuesta: respuesta.data.msg, tipo: true }

        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false }
        }
    }

    const actualizarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tesorero/actualizar-password`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.put(url, datos, options)
            setAuth(prevAuth => ({
                ...prevAuth,  
                msg: respuesta.data.msg
            }))
            console.log(auth)
            return { respuesta: respuesta.data.msg, tipo: true }

        } catch (error) {
            return { respuesta: error.response.data.msg, tipo: false }
        }
    }

    
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                actualizarPerfil, 
                actualizarPassword         
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider,
    useAuth
}
export default AuthContext