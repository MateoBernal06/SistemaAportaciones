import { Formulario } from '../componets/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensajes';
import axios from 'axios';



const Actualizar = () => {
    const { id } = useParams() // Recibe el id del veterinario
    const [paciente, setPaciente] = useState({}) // Almacena los datos del veterinario
    const [mensaje, setMensaje] = useState({}) // Almacena el mensaje de error

    useEffect(() => { // Funcion para consultar los datos del veterinario
        const consultarPaciente = async () => { //lo que hace es consultar los datos del veterinario
            try {
                const token = localStorage.getItem('token') //almacena el token 
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/${id}` //almacena la url paciente
                const options = { //almacena las opciones
                    headers: {
                        'Content-Type': 'application/json',//almacena el tipo de contenido
                        Authorization: `Bearer ${token}` //almacena el token
                    }
                }
                const respuesta = await axios.get(url, options) //almacena la respuesta de la consulta
                setPaciente(respuesta.data.paciente) //almacena los datos del veterinario en el estado
            } catch (error) { //manejo de errores
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarPaciente() //llama a la funcion consultarPaciente
    }, [])

    return ( //retorna el html
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Paciente</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un paciente registrado</p>
            {
                Object.keys(paciente).length != 0 ?
                    (
                        <Formulario paciente={paciente}/>
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