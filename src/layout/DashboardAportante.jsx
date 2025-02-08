import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import logoASO from '../assets/logos/logo_aso.jpg'



const DashboardAportante = () => {

    const location = useLocation()
    const urlActual = location.pathname
    const { auth } = useAuth()
    
    return(
        <div>
            <div>
                <nav className='botones-logo-frase'>
                    <div className='lugar-logo'>
                        <img className='logo' src={logoASO} alt="logo-esfot"/>
                    </div>
                    <div className='lugar-frase'>
                        <p className='frase'>
                            "En la ESFOT, el futuro se construye con ingenio, pasión y tecnología. ¡Sueña en grande, 
                            innova sin límites y transforma el mundo a tu alcance!" 🚀
                        </p>
                    </div>
                    <div className='login-register-mod'>
                        <div className='text-md font-semibold text-slate-100'>
                            Bienvenido - {auth.nombre}
                        </div>
                        <div>
                            <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                        </div>
                        <div>
                            <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                            bg-red-800 px-4 py-1 rounded-lg" onClick={()=>{localStorage.removeItem('token'), localStorage.removeItem('rol')}}>Salir</Link>
                        </div>
                    </div> 
                </nav>
            </div>
            <div className='barra-menu'>
                <ul className='menu'>
                    <li>Ir al Perfil</li>
                    <li>Planes de Aportacion</li>
                    <li>Tus Planes</li>
                </ul>
            </div>
            <div className='overflow-y-scroll p-8'>
                <Outlet />
            </div>
            <div className='bg-[rgb(22,22,21)] h-12 fixed bottom-0 w-full'>
                <p className='text-center text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
            </div>
        </div>
    )
}
export default DashboardAportante