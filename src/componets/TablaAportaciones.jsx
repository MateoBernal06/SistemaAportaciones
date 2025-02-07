import { useContext } from "react";
import { MdDeleteForever, MdOutlineSecurityUpdateGood, MdPublishedWithChanges } from "react-icons/md";
import aportacionesContext from "../context/AportacionesProvider";
import AuthContext from "../context/AuthProvider";

const TablaAportaciones = () => {
    
    const { aportaciones, handleDelete, handleStatus } = useContext(aportacionesContext);
    const { auth } = useContext(AuthContext);

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

    return (
        <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
            <thead className='bg-gray-800 text-slate-400'>
                <tr>
                    <th className='p-2'>N°</th>
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
                    aportaciones.map((aportacion, index) => (
                        <tr className="border-b hover:bg-gray-300 text-center" key={aportacion._id}>
                            <td>{index + 1}</td>
                            <td>{aportacion.tipoAportacion}</td>
                            <td>{aportacion.descripcion}</td>
                            <td>{formatFecha(aportacion.reserva)}</td>
                            <td>{formatFecha(aportacion.entrega)}</td>
                            <td>
                                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{aportacion.estado && "activo"}</span>
                            </td>
                            <td className='py-2 text-center'>
                                {
                                    auth.rol === "tesorero" &&
                                    (
                                        <>
                                            <MdPublishedWithChanges className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"/>
                                            
                                            <MdOutlineSecurityUpdateGood className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                onClick={() => handleStatus(aportacion._id)}
                                            />
                            
                                            <MdDeleteForever className="h-8 w-8 text-red-900 cursor-pointer inline-block"
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
    );
};

export default TablaAportaciones;
