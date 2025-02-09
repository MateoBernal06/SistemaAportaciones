import axios from "axios";
import Button from 'react-bootstrap/Button';
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = form.password.includes("esfot")
            ? `${import.meta.env.VITE_BACKEND_URL}/aportante/login`
            : `${import.meta.env.VITE_BACKEND_URL}/login`;

        try {
            const respuesta = await axios.post(url, form);
            setAuth(respuesta.data);
            localStorage.setItem('token', respuesta.data.token);
            localStorage.setItem('rol', respuesta.data.rol);
            navigate('/dashboard');
            toast.success(respuesta.data.msg);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
            } else if (error.request) {
                console.log("Error de red:", error.request);
            } else {
                console.log("Error desconocido:", error.message);
            }
        }
    };

    return (
        <>
            <div
                className="w-1/2 h-screen"
                style={{
                    backgroundImage: "url('/public/images/directiva_login.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>

            <div className="w-1/2 h-screen bg-white flex justify-center items-center">
                <ToastContainer />
                <div className="md:w-4/5 sm:w-full">
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">
                        Bienvenido Dragon 🐲
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                placeholder="Ingresa email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <input
                                type="password"
                                placeholder="Ingresa contraseña"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                            />
                        </div>

                        <div className="mb-4">
                            <button className="py-2 w-full block text-center bg-red-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4">
                        <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">
                            Forgot your password?
                        </Link>
                    </div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>Don't have an account?</p>
                        <Link to="/register">
                            <Button variant="outline-primary" size="lg">Registro</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
