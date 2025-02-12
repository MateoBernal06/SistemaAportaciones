import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import Mensaje from "./Alertas/Mensajes";
import { ToastContainer,toast } from "react-toastify";

const Tabla = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [aportantes, setAportantes] = useState([]);

    const listarAportantes = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/aportantes`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setAportantes(respuesta.data);

        } catch (error) {
            console.log(error);
        }
    };

    const eliminarAportantes = async (id) => {
        try {
            const confirmar = window.confirm(
                "¿Estás seguro de eliminar al aportante?"
            );
            if (confirmar) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/aportante/eliminar/${id}`;
                const headers = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                };
                const data = {
                    salida: new Date().toString(),
                };
                await axios.request({ method: "DELETE", url, headers, data });
                listarAportantes();
                toast.success('Aportante eliminado correctamente', {
                    position: 'top-right', 
                    autoClose: 3000})
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarAportantes();
    }, [auth]);


    return (
        <>
        <ToastContainer />
            {aportantes.length === 0 ? (
                <Mensaje tipo={"active"}>{"No existen registros"}</Mensaje>
            ) : (
                <table className="w-full mt-5 table-auto shadow-lg bg-white">
                    <thead className="bg-gray-800 text-slate-400 text-center">
                        <tr>
                            <th className="p-2">N°</th>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Apellido</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Celular</th>
                            <th className="p-2">Estado</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {aportantes.map((aportante, index) => (
                            <tr
                                className="border-b hover:bg-gray-300 text-center"
                                key={aportante._id}
                            >
                                <td>{index + 1}</td>
                                <td>{aportante.nombre}</td>
                                <td>{aportante.apellido}</td>
                                <td>{aportante.email}</td>
                                <td>{aportante.celular}</td>
                                <td>
                                    <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                                        {aportante.estado ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="py-2 text-center">
                                    <MdNoteAdd
                                        className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/visualizar/${aportante._id}`
                                            )
                                        }
                                    />
                                    {auth?.rol === "tesorero" && (
                                        <>
                                            <MdOutlineEdit
                                                className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() =>
                                                    navigate(
                                                        `/dashboard/actualizar/${aportante._id}`
                                                    )
                                                }
                                            />

                                            <MdDeleteForever
                                                className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                onClick={() =>
                                                    eliminarAportantes(
                                                        aportante._id
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Tabla;
