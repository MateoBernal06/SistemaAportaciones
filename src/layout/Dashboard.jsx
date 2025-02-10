
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import logoASO from '../assets/logos/logo_aso.jpg'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { auth } = useAuth();

    return(
        <div>
            <div className='dashboard'>
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
                        <li><Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Perfil</Link></li>
                        <li><Link to='/dashboard/crear' className={`${urlActual === '/dashboard/crear' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Crear</Link></li>
                        <li><Link to='/dashboard/listar' className={`${urlActual === '/dashboard/listar' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Listar</Link></li>
                    </ul>
                </div>
            </div>
            <main className='contenido'>
                <Outlet />
            </main>
            <div className='bg-[rgb(22,22,21)] h-12 fixed bottom-0 w-full'>
                <p className='text-center text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
            </div>
        </div>
    )
}

export default Dashboard