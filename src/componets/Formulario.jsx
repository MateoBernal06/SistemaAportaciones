import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider"
import axios from 'axios';
import Mensaje from "./Alertas/Mensajes";


export const Formulario = ({ aportante }) => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [form, setform] = useState({
        nombre: aportante?.nombre ?? "",
        apellido: aportante?.apellido ?? "",
        email: aportante?.email ?? "",
        celular: aportante?.celular ?? "",
        plan: aportante?.plan ?? "",
        reserva: new Date(aportante?.reserva).toLocaleDateString('en-CA', {timeZone: 'UTC'}) ?? "",
        entrega: new Date(aportante?.entrega).toLocaleDateString('en-CA', {timeZone: 'UTC'}) ?? ""
    })



    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (aportante?._id) {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/aportante/actualizar/${aportante?._id}`
            const options = {
                headers: {
                    method: 'PUT',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.put(url, form, options)
            navigate('/dashboard/listar')
        }
        else {
            try {
                const token = localStorage.getItem('token')
                form.id = auth._id
                const url = `${import.meta.env.VITE_BACKEND_URL}/aportante/registro`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url, form, options)
                navigate('/dashboard/listar')
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 3000);
            }
        }
    }

    return (

        <form onSubmit={handleSubmit}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del aportante: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del aportante'
                    name='nombre'
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del aportante: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido del aportante'
                    name='nombre'
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='email del propietario'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='celular:'
                    className='text-gray-700 uppercase font-bold text-sm'>Celular: </label>
                <input
                    id='celular'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='celular del propietario'
                    name='celular'
                    value={form.celular}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='plan:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del plan: </label>
                <input
                    id='plan'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre del plan'
                    name='plan'
                    value={form.plan}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='Reserva:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de reservacion: </label>
                <input
                    id='reserva'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='reservacion'
                    name='reserva'
                    value={form.reserva}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='entrega:'
                    className='text-gray-700 uppercase font-bold text-sm'>Fecha de entrega: </label>
                <input
                    id='entrega'
                    type="date"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='entrega'
                    name='entrega'
                    value={form.entrega}
                    onChange={handleChange}
                />
            </div>
            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                    value={aportante?._id ? 'Actualizar aportante' : 'Registrar aportante'} />

        </form>
    )
}