import React from 'react'
import Tabla from '../componets/Tabla'

const Listar = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Aportantes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar a los Aportantes</p>
            <Tabla/>
        </div>
    )
}

export default Listar