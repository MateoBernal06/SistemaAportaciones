import { useContext, useState, useEffect } from "react";
import aportacionesContext from "../../context/AportacionesProvider";

const ModalEditarAportacion = ({ aportacion, cerrarModal }) => {
    const { actualizarAportacion } = useContext(aportacionesContext);

    const [form, setForm] = useState({
        tipoAportacion: "",
        descripcion: "",
        reserva: "",
        entrega: "",
        aportante: "",
    });

    useEffect(() => {
        if (aportacion) {
            setForm({
                tipoAportacion: aportacion.tipoAportacion || "",
                descripcion: aportacion.descripcion || "",
                entrega: aportacion.entrega ? aportacion.entrega.split("T")[0] : "",
                aportante: aportacion.aportante || "",
            });
        }
    }, [aportacion]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actualizarAportacion(aportacion._id, form);
        cerrarModal(); 
    };

    return (
        <div className="lg:w-2/4 lg:h-3/5 bg-gray-800 bg-opacity-100 top-1/4 left-1/3 fixed rounded-lg overflow-y-scroll">
            <p className="text-white uppercase font-bold text-lg text-center mt-4">Editar Aportación</p>
            <form className="p-10" onSubmit={handleSubmit}>
                <div>
                    <label className="text-white uppercase font-bold text-sm">Nombre Aportación:</label>
                    <select
                        name="tipoAportacion"
                        value={form.tipoAportacion}
                        onChange={handleChange}
                        className="border-2 w-full p-2 mt-2 rounded-md mb-5"
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="Tianlong">Tianlong</option>
                        <option value="Colacuerno">Colacuerno</option>
                        <option value="Celestial">Celestial</option>
                    </select>
                </div>
                <div>
                    <label className="text-white uppercase font-bold text-sm">Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="border-2 w-full p-2 mt-2 rounded-md mb-5"
                        placeholder="Descripción del plan de aportación"
                    />
                </div>
                <div>
                    <label className="text-white uppercase font-bold text-sm">Fecha de entrega:</label>
                    <input
                        type="date"
                        name="entrega"
                        value={form.entrega}
                        onChange={handleChange}
                        className="border-2 w-full p-2 mt-2 rounded-md mb-5"
                    />
                </div>
                <div>
                    <label className="text-white uppercase font-bold text-sm">ID Aportante:</label>
                    <input
                        type="text"
                        disabled
                        value={form.aportante}
                        className="border-2 w-full p-2 mt-2 bg-slate-300 rounded-md mb-5"
                    />
                </div>
                <div className="flex justify-center gap-5">
                    <input
                        type="submit"
                        className="bg-green-700 px-6 text-slate-300 rounded-lg hover:bg-green-900 cursor-pointer"
                        value="Actualizar"
                    />
                    <button
                        className="bg-red-700 px-6 text-white rounded-lg hover:bg-red-900"
                        onClick={cerrarModal}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalEditarAportacion;
