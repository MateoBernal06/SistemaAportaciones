import { use, useEffect } from 'react'
import logoDragon from '../assets/dragonite.jpg'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';

export const Confirmar = () => {

    //PASO 1
    const {token} = useParams()

    //PASO 2 

    const verifyToken = async () => {
        try {
            const url =`${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            const respuesta = await axios.get(url)
            console.log(respuesta.data.msg)
            toast.success(respuesta.data.msg)

        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.msg || "Error desconocido");

        }
    }
    useEffect(() => {
        if (token) { 
            verifyToken(); 
        }
    }, [token])


    return (
        
        <div className="flex flex-col items-center justify-center">
            <ToastContainer />
            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDragon} alt="image description"/>
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Ya puedes iniciar sesión</p>
                <Link to="/login"><Button variant="outline-danger" size="lg">Login</Button></Link>
            </div>
        </div>
    )
}
