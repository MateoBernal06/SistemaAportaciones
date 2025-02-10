import { useContext, useState } from "react"
import aportacionesContext from "../../context/AportacionesProvider"
import { ToastContainer, toast } from "react-toastify"

const ModalAportacion = ({ idAportante }) => {
    const { handleModal,registrarAportacion,setModal } = useContext(aportacionesContext)

    const obtenerFechaActual = () => {
        const hoy = new Date();
        const year = hoy.getFullYear();
        const month = String(hoy.getMonth() + 1).padStart(2, "0"); 
        const day = String(hoy.getDate()).padStart(2, "0"); 
        return `${year}-${month}-${day}`;
    };

    const [form, setForm] = useState({
        tipoAportacion: "",
        descripcion: "",
        reserva: obtenerFechaActual(),
        entrega: "",
        aportante: idAportante
    })


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.tipoAportacion || !form.descripcion || !form.reserva || !form.entrega) {
            toast.error("Todos los campos son obligatorios", {
                position: "top-right",
                autoClose: 2000,
            });
            return;
        }
        else{
            toast.success("Aportacion registrada con exito", {
                position: "top-right",
                autoClose: 2000,
            })
        }
    
        registrarAportacion(form);
        setModal(false);
    }


    return (
        <div className="lg:w-2/4 lg:h-3/5 bg-gray-800 bg-opacity-100 top-1/4 left-1/3 fixed sticky-0 rounded-lg overflow-y-scroll ">
        <ToastContainer/>
            <p className='text-white uppercase font-bold text-lg text-center mt-4'>Plan de aportacion</p>
            <form className='p-10' onSubmit={handleSubmit}>

                <div>
                    <label
                        htmlFor='tipoAportacion:'
                        className='text-white uppercase font-bold text-sm'>Nombre Aportacion: </label>
                    <select
                        id='tipoAportacion'
                        value={form.tipoAportacion}
                        name='tipoAportacion'
                        onChange={handleChange}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'>
                        <option value="" disabled>--- Seleccionar ---</option>
                        <option value="Tianlong">Tianlong</option>
                        <option value="Colacuerno">Colacuerno</option>
                        <option value="Celestial">Celestial</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor='descripcion:'
                        className='text-white uppercase font-bold text-sm'>Descripción: </label>
                    <textarea
                        id='descripcion'
                        type="text"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='Descripción del plan de aportacion'
                        name='descripcion'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor='reserva:'
                        className='text-white uppercase font-bold text-sm'>Fecha de reservacion: </label>
                    <input
                        id='reserva'
                        type="date"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='fecha de reservacion de la aportacion'
                        name='reserva'
                        value={form.reserva}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        htmlFor='entrega:'
                        className='text-white uppercase font-bold text-sm'>Fecha de entrega: </label>
                    <input
                        id='entrega'
                        type="date"
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                        placeholder='fecha de entrega de la aportacion'
                        name='entrega'
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label
                        className='text-white uppercase font-bold text-sm'>ID Aportante: </label>
                    <input
                        type="text"
                        disabled
                        value={idAportante}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-200 bg-slate-300 rounded-md mb-5'
                        name='aportante'
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-center gap-5'>
                    <input
                        type="submit"
                        className='bg-green-700 px-6 
                    text-slate-300 rounded-lg 
                    hover:bg-green-900 cursor-pointer'
                        value='Registrar' />

                    <button className="sm:w-auto leading-3 text-center text-white px-6 py-4 rounded-lg bg-red-700 hover:bg-red-900"

                        onClick={handleModal}>Cancelar</button>
                </div>

            </form>

        </div>
    )
}

export default ModalAportacion