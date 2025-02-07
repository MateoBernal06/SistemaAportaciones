import { Formulario } from '../componets/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensajes';
import axios from 'axios';


const Actualizar = () => {
    const { id } = useParams() 
    const [aportante, setaportante] = useState({}) 
    const [mensaje, setMensaje] = useState({}) 

    useEffect(() => { 
        const consultarAportante = async () => { 
            try {
                const token = localStorage.getItem('token') 
                const url = `${import.meta.env.VITE_BACKEND_URL}/aportante/${id}` 
                const options = { 
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                }
                const respuesta = await axios.get(url, options) 
                setaportante(respuesta.data.aportante) 
            } catch (error) { 
                console.log(error)
            }
        }
        consultarAportante() 
    }, [])


    return ( 
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Aportante</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un aportante registrado</p>
            {
                Object.keys(aportante).length != 0 ?
                    (
                        <Formulario aportante={aportante}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default Actualizar