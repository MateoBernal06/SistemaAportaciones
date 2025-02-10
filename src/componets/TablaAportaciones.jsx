import { useContext, useState } from "react";
import { MdDeleteForever, MdOutlinePublishedWithChanges, MdOutlineEdit } from "react-icons/md";
import aportacionesContext from "../context/AportacionesProvider";
import AuthContext from "../context/AuthProvider";
import ModalEditarAportacion from "../componets/Modals/ModalEditarAportacion";



const TablaAportaciones = () => {
    
    const { aportaciones, handleDelete, handleStatus } = useContext(aportacionesContext);
    const { auth } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [aportacionSeleccionada, setAportacionSeleccionada] = useState(null);

    const formatFecha = (fecha) => {
        if (!fecha) return "";
        const date = new Date(fecha);
        return new Intl.DateTimeFormat("es-ES", {
            timeZone: "UTC",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    };

    const abrirModalEdicion = (aportacion) => {
        setAportacionSeleccionada(aportacion);
        setModalOpen(true);
    };
    
    const cerrarModal = () => {
        setModalOpen(false);
        setAportacionSeleccionada(null);
    };

    return (
        <>
            <table className='w-full mt-5 table-auto shadow-lg bg-white'>
                <thead className='bg-gray-800 text-slate-400 text-center'>
                    <tr>
                        <th className='p-2'>ID</th>
                        <th className='p-2'>Plan</th>
                        <th className='p-2'>Descripción</th>
                        <th className='p-2'>Reserva</th>
                        <th className='p-2'>Entrega</th>
                        <th className='p-2'>Estado</th>
                        <th className='p-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        aportaciones.map((aportacion) => (
                            <tr className="border-b hover:bg-gray-300 text-center" key={aportacion._id}>
                                <td>{aportacion.aportante}</td>
                                <td>{aportacion.tipoAportacion}</td>
                                <td>{aportacion.descripcion}</td>
                                <td>{formatFecha(aportacion.reserva)}</td>
                                <td>{formatFecha(aportacion.entrega)}</td>
                                <td>
                                    <span 
                                        className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded 
                                            ${aportacion.estado ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
                                    >
                                        {aportacion.estado ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className='py-2 text-center'>
                                    {
                                        auth.rol === "tesorero" &&
                                        (
                                            <>
                                                <MdOutlineEdit 
                                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                    onClick={() => abrirModalEdicion(aportacion)}
                                                />
                                                
                                                <MdOutlinePublishedWithChanges
                                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                    onClick={() => handleStatus(aportacion._id)}
                                                />
    
                                                <MdDeleteForever 
                                                    className="h-8 w-8 text-red-900 cursor-pointer inline-block"
                                                    onClick={() => handleDelete(aportacion._id)}
                                                />
                                            </>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {modalOpen && <ModalEditarAportacion aportacion={aportacionSeleccionada} cerrarModal={cerrarModal} />}
        </>
    );
};

export default TablaAportaciones;
