import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { toast } from 'react-toastify';

const FormularioPerfil = () => {
    const { auth, actualizarPerfil } = useContext(AuthContext);
    const [form, setForm] = useState({
        id: "",
        nombre: "",
        apellido: "",
        celular: "",
        email: ""
    });

    useEffect(() => {
        setForm({
            id: auth._id || "",
            nombre: auth.nombre || "",
            apellido: auth.apellido || "",
            celular: auth.celular || "",
            email: auth.email || ""
        });
    }, [auth]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(form).includes("")) {
            toast.error("Todos los campos deben ser ingresados", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        const resultado = await actualizarPerfil(form);
        if (resultado.tipo) {
            toast.success(resultado.respuesta, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(resultado.respuesta, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            

            <div>
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre: </label>
                <input
                    id="nombre"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    placeholder="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="apellido" className="text-gray-700 uppercase font-bold text-sm">Apellido: </label>
                <input
                    id="apellido"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    placeholder="apellido"
                    name="apellido"
                    value={form.apellido}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="celular" className="text-gray-700 uppercase font-bold text-sm">Celular: </label>
                <input
                    id="celular"
                    type="number"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    placeholder="celular"
                    name="celular"
                    value={form.celular}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">Email: </label>
                <input
                    id="email"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                    placeholder="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-gray-800 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-600 cursor-pointer transition-all"
                value="Actualizar"
            />
        </form>
    );
};

export default FormularioPerfil;