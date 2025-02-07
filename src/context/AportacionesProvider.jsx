import { createContext, useState, useEffect } from "react";
import axios from "axios";

const aportacionesContext = createContext();

const AportacionesProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
    const [mensaje, setMensaje] = useState({});
    const [aportaciones, setAportaciones] = useState(() => {
        const storedAportaciones = localStorage.getItem("aportaciones");
        return storedAportaciones ? JSON.parse(storedAportaciones) : [];
    });

    useEffect(() => {
        localStorage.setItem("aportaciones", JSON.stringify(aportaciones));
    }, [aportaciones]);

    const handleModal = () => {
        setModal(!modal);
    };

    const registrarAportacion = async (datos) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje({ respuesta: "No tienes autorización", tipo: false });
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/aportacion/registro`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.post(url, datos, options);
            setAportaciones([respuesta.data.aportacion, ...aportaciones]);
        } catch (error) {
            setMensaje({
                respuesta: error.response?.data?.msg || "Error al registrar aportación",
                tipo: false,
            });
        }
    };

    const actualizarAportacion = async (id, datos) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje({ respuesta: "No tienes autorización", tipo: false });
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/aportacion/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.put(url, datos, options);
            const updatedAportaciones = aportaciones.map((aport) =>
                aport._id === id ? { ...aport, ...datos } : aport
            );
    
            setAportaciones(updatedAportaciones);
            setMensaje({ respuesta: respuesta.data?.msg, tipo: true });
            setTimeout(() => setMensaje({}), 2000);
        } catch (error) {
            setMensaje({
                respuesta: error.response?.data?.msg || "Error al actualizar la aportación",
                tipo: false,
            });
        }
    };

    const handleDelete = async (id) => {
        const confirmar = confirm("¿Estás seguro de eliminar la aportación?");
        if (!confirmar) return;

        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje({ respuesta: "No tienes autorización", tipo: false });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/aportacion/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(url, options);
            setAportaciones(aportaciones.filter((aportacion) => aportacion._id !== id));
            setMensaje({ respuesta: response.data?.msg, tipo: true });
            setTimeout(() => setMensaje({}), 2000);
        } catch (error) {
            setMensaje({
                respuesta: error.response?.data?.msg || "Error al eliminar la aportación",
                tipo: false,
            });
        }
    };

    const handleStatus = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setMensaje({ respuesta: "No tienes autorización", tipo: false });
            return;
        }
    
        try {
            const confirmar = confirm("¿Seguro que deseas finalizar esta aportación?");
            if (!confirmar) return;
    
            const url = `${import.meta.env.VITE_BACKEND_URL}/aportacion/estado/${id}`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
    
            const response = await axios.post(url, {}, options);
    
            const updatedAportaciones = aportaciones.map((aportacion) => 
                aportacion._id === id ? { ...aportacion, estado: false } : aportacion
            );
    
            setAportaciones(updatedAportaciones);
            setMensaje({ respuesta: response.data?.msg, tipo: true });
    
            setTimeout(() => setMensaje({}), 2000);
        } catch (error) {
            setMensaje({
                respuesta: error.response?.data?.msg || "Error al actualizar el estado",
                tipo: false,
            });
        }
    };

    return (
        <aportacionesContext.Provider
            value={{
                modal,
                setModal,
                handleModal,
                aportaciones,
                setAportaciones,
                registrarAportacion,
                actualizarAportacion,
                handleDelete,
                handleStatus,
                mensaje,
            }}
        >
            {children}
        </aportacionesContext.Provider>
    );
};

export { AportacionesProvider };
export default aportacionesContext;
