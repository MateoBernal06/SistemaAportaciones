import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const aportacionesContext = createContext();

const AportacionesProvider = ({ children }) => {
    const [modal, setModal] = useState(false);
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
            toast.success("Aportacion registrada", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setAportaciones([respuesta.data.aportacion, ...aportaciones]);
        } catch (error) {
            console.log(error.response?.data?.msg)
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
            toast.success("Aportacion actualizada", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            console.log(error.response?.data?.msg )
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
            toast.success(response.data?.msg)
        } catch (error) {
            toast.error(error.response?.data?.msg || "Error al eliminar la aportación")
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
            toast.success("Estado de la aportacion actualizado",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (error) {
            toast.error(error.response?.data?.msg)
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
            }}
        >
            {children}
        </aportacionesContext.Provider>
    );
};

export { AportacionesProvider };
export default aportacionesContext;
