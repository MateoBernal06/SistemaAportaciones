import { createContext, useState } from "react";
import axios from "axios";

const TratamientosContext = createContext();

const TratamientosProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [mensaje, setMensaje] = useState({});
    const [tratamientos, setTratamientos] = useState([]);

    const handleModal = () => {
        setModal(!modal);
    };

    const registrarTratamientos = async (datos) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje({ respuesta: "No tienes autorización", tipo: false });
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.post(url, datos, options);
            setTratamientos([respuesta.data.tratamiento, ...tratamientos]);
        } catch (error) {
            setMensaje({ 
                respuesta: error.response?.data?.msg || "Error al registrar tratamiento", 
                tipo: false 
            });
        }
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("¿Estás seguro de eliminar el tratamiento?");
        if (!confirmar) return;

        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje({ respuesta: "No tienes autorización", tipo: false });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(url, options);
            setTratamientos(tratamientos.filter((tratamiento) => tratamiento._id !== id));
            setMensaje({ respuesta: response.data?.msg, tipo: true });
            setTimeout(() => setMensaje({}), 2000);
        } catch (error) {
            setMensaje({ 
                respuesta: error.response?.data?.msg || "Error al eliminar tratamiento", 
                tipo: false 
            });
        }
    };

    const handleStatus = async (id) => {
        const token = localStorage.getItem('token')
        try {
            const confirmar = confirm("Vas a finalizar el tratamiento de un paciente, ¿Estás seguro de realizar esta acción?")
            if (confirmar){ 
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const response= await axios.post(url,{},options);
                const tratamientosActualizados = tratamientos.filter(tratamiento => tratamiento._id !== id)
                setTratamientos(tratamientosActualizados)
                setMensaje({ respuesta: response.data?.msg, tipo: false })
                setTimeout(() => {
                    setMensaje({})
                }, 2000);
            }
        }
        catch (error) {
            setMensaje({ respuesta: response.data?.msg, tipo: false })
        }
    }
    
    return (
        <TratamientosContext.Provider
            value={{
                modal,
                setModal,
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamientos,
                handleDelete,
                handleStatus,
                mensaje,
            }}
        >
            {children}
        </TratamientosContext.Provider>
    );
};

export { TratamientosProvider };
export default TratamientosContext;
