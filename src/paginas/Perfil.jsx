import React from 'react'
import { CardPerfil } from '../componets/Perfil/CardPerfil'
import { CardPerfilAportante } from '../componets/Perfil/CardPerfilAportante'
import Password from '../componets/Perfil/Password'
import FormularioPerfil from '../componets/Perfil/FormularioPerfil'
import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'

const Perfil = () => {
    const { auth } = useContext(AuthContext)
    return (
        <>       
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='my-4' />
            </div>
            {auth?.rol === "aportante" && <CardPerfilAportante />}
            {auth?.rol === "tesorero" && (
                <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                    <div className='w-full md:w-1/2'>
                        <CardPerfil />
                    </div>
                    <div className='w-full md:w-1/2'>
                        <FormularioPerfil />
                        <Password />
                    </div>
                    <div className='w-full md:w-1/2'>
                    </div>
                </div>
            )}
            {!auth?.rol && <p className="text-red-500">No tienes permisos para ver esta sección.</p>}
        </>

    )
}

export default Perfil