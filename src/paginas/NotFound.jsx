import logoDragon from '../assets/charizard.jpg'
import {Link} from 'react-router-dom'
import Button  from 'react-bootstrap/Button'

export const NotFound = () => {
    return (
        

        <div className="flex flex-col items-center justify-center">

            <img class="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={logoDragon} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Page Not Found</p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Sorry, the page you are looking for could not be found.</p>
                <Link to="/"><Button variant="outline-primary" size="lg">Ir al inicio</Button></Link>
            </div>
        </div>
    )
}

