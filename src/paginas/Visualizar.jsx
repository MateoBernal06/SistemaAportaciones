import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import ModalAportacion from '../componets/Modals/ModalAportacion';
import aportacionesContext from '../context/AportacionesProvider';
import TablaAportaciones from '../componets/TablaAportaciones';
import AuthContext from '../context/AuthProvider';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


const Visualizar = () => {

    const {modal,handleModal,aportaciones,setTratamientos} = useContext(aportacionesContext)
    const { auth } = useContext(AuthContext)
    const { id } = useParams()
    const [aportante, setAportante] = useState({})
    const [mensaje, setMensaje] = useState({})

    /*const formatFecha = (fecha) => {
        if (!fecha) return "";
        const date = new Date(fecha);
        return new Intl.DateTimeFormat("es-ES", {
        timeZone: "UTC",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
    };*/

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
                {
                    auth.rol === "tesorero" &&
                    (
                        <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 " onClick={handleModal}>Registrar Aportacion</button>
                    )
                }
            </div>
            <div>
                {
                    Object.keys(aportante).length != 0 ?
                        (
                            <>
                                <div className='card-visualizar'>
                                    <Card style={{ width: '25rem', textAlign: 'center'}}>
                                        <Card.Header><b>ID: </b>{aportante._id}</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item><b>Nombre: </b>{aportante.nombre}</ListGroup.Item>
                                            <ListGroup.Item><b>Apellido: </b>{aportante.apellido}</ListGroup.Item>
                                            <ListGroup.Item><b>Email: </b>{aportante.email}</ListGroup.Item>
                                            <ListGroup.Item><b>Celular: </b>{aportante.celular}</ListGroup.Item>
                                            <ListGroup.Item ><b>Estado: </b>{aportante.estado && "activo"}</ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </div>
                                <hr className='my-4' />  
                                {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                                <div className='flex justify-between items-center'>
                                    <p>Este submódulo te permite visualizar los planes de aportcion de los aportantes</p>
                                </div>

                                {modal &&(<ModalAportacion idAportante={aportante._id} />)}
                                {
                                    aportaciones.length == 0 ?
                                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                                    :
                                    <TablaAportaciones aportaciones={aportaciones} />
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