import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider"
import axios from 'axios';
import { toast } from 'react-toastify';

export const Formulario = ({ aportante }) => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setform] = useState({
        nombre: aportante?.nombre ?? "",
        apellido: aportante?.apellido ?? "",
        email: aportante?.email ?? "",
        celular: aportante?.celular ?? "",
        //plan: aportante?.plan ?? "",
        //reserva: new Date(aportante?.reserva).toLocaleDateString('en-CA', {timeZone: 'UTC'}) ?? "",
        //entrega: new Date(aportante?.entrega).toLocaleDateString('en-CA', {timeZone: 'UTC'}) ?? ""
    })



    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!form.nombre || !form.apellido || !form.email || !form.celular) {
            toast.error("Todos los campos son obligatorios", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            };

            if (aportante?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/aportante/actualizar/${aportante?._id}`;
                await axios.put(url, form, options);
                toast.success("Aportante actualizado exitosamente!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                form.id = auth._id;
                const url = `${import.meta.env.VITE_BACKEND_URL}/aportante/registro`;
                await axios.post(url, form, options);
            }
            navigate("/dashboard/listar");
            toast.success("Aportante registrado exitosamente!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            toast.error(error.response?.data?.msg || "Ocurrió un error", {
            position: "top-right",
            autoClose: 3000,});
            }
    };

    return (

        <form onSubmit={handleSubmit}>
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
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del aportante: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido del aportante'
                    name='apellido'
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
                    placeholder='email del aportante'
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
                    placeholder='celular del aportante'
                    name='celular'
                    value={form.celular}
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