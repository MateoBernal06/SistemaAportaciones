import React from 'react'
import { CardPerfilAportante } from '../componets/Perfil/CardPerfilAportante'
/*import AuthContext from '../context/AuthProvider'
import { useContext } from 'react'*/

const PerfilAportante = () => {
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este módulo te permite visualizar el perfil del usuario......</p>
            </div>
            <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                <CardPerfilAportante />
            </div>
        </>
    )
}

export default PerfilAportante