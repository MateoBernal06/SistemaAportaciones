import { Link } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import { ToastContainer,toast } from 'react-toastify';


//paso 1
export const Register = () => {
    const [form, setform] = useState({
        nombre: "",
        apellido: "",
        celular: "",
        email: "",
        password: ""
    })

    //paso 2
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const url =`${import.meta.env.VITE_BACKEND_URL}/registro`
            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
            console.log(respuesta)
        }catch(error){
            console.log(error)
            toast.error(error.response.data.msg)
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="bg-white flex justify-center items-center w-1/2">
                <div className="md:w-4/5 sm:w-full">
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase  text-gray-500">bienvenido dragon 🐉</h1>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="celular">Celular:</label>
                            <input type="number" min="0" id="celular" 
                            name='celular'
                            value={form.celular || ""}
                            onChange={handleChange}
                                placeholder="Ingresa tu teléfono" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="email">Email:</label>
                            <input type="email" id="email" 
                            name='email'
                            value={form.email || ""} 
                            onChange={handleChange}
                                placeholder="Ingresa tu email" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold" htmlFor="password">Contraseña:</label>
                            <input type="password" id="password" name='password'
                                value={form.password || ""} onChange={handleChange}
                                placeholder="********" className="block w-full rounded-md border border-gray-300 focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700 py-1 px-1.5 text-gray-500" required />
                        </div>

                        <div className="mb-3">
                            <button className="bg-red-500 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Register
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>You've already an account?</p>
                        <Link to="/login"><Button variant="outline-primary" size="lg">Login</Button></Link>
                    </div>


                </div>

            </div>

            <div
                className="w-1/2 h-screen"
                style={{
                    backgroundImage: "url('/public/images/dragon_forgot.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>
        </>
    )
}