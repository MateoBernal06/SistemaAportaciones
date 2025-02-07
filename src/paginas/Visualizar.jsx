import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import ModalTratamiento from '../componets/Modals/ModalTratamiento';
import TratamientosContext from '../context/TratamientosProvider';
import TablaTratamientos from '../componets/TablaTratamientos';
import AuthContext from '../context/AuthProvider';

const Visualizar = () => {

    const {modal,handleModal,tratamientos,setTratamientos} = useContext(TratamientosContext)
    const { auth } = useContext(AuthContext)
    const { id } = useParams()
    const [aportante, setAportante] = useState({})
    const [mensaje, setMensaje] = useState({})

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

    useEffect(() => {
        const consultarAportantes = async () => {
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
                setAportante(respuesta.data.aportante)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarAportantes()
    }, [])

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar a detalle a aportante</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del aportante</p>
                {
                    auth.rol === "tesorero" &&
                    (
                        <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700" onClick={handleModal}>Registrar</button>
                    )
                }
            </div>
            <div>
                {
                    Object.keys(aportante).length != 0 ?
                        (
                            <>
                                <div className='m-5 flex justify-between'>
                                    <div>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Nombre del aportante: </span>
                                            {aportante.nombre}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* celular: </span>
                                            {aportante.celular}
                                        </p>
            
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                            {aportante.email}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Plan: </span>
                                            {aportante.plan}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Fecha de reserva: </span>
                                            {formatFecha(aportante.reserva)}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Fecha de entrega: </span>
                                            {formatFecha(aportante.entrega)}
                                        </p>
                                        <p className="text-md text-gray-00 mt-4">
                                            <span className="text-gray-600 uppercase font-bold">* Estado: </span>
                                            <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{aportante.estado && "activo"}</span>
                                        </p>
                                    </div>
                                    <div>
                                        <img src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png" alt="dogandcat" className='h-80 w-80' />
                                    </div>
                                </div>
                                <hr className='my-4' />  
                                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <div className='flex justify-between items-center'>
                                    <p>Este submódulo te permite visualizar los tratamientos del aportante</p>
                                </div>

                                {modal &&(<ModalTratamiento idaportante={aportante._id} />)}
                                {
                                    tratamientos.length == 0 ?
                                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                                    :
                                    <TablaTratamientos tratamientos={tratamientos} />
                                }

                            </>

                        )
                        :
                        (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                }
            </div>
        </>

    )
}

export default Visualizar