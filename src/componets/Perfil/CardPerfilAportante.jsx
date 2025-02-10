
import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import Card from 'react-bootstrap/Card';

export const CardPerfilAportante = () => {
    const { auth } = useContext(AuthContext)
    return (
        <div className="lugar-card">
            <Card className='card-perfil'>
                <Card.Img variant="top" className='logo-perfil' src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" />
                <Card.Body>
                    <Card.Title>Datos del aportante</Card.Title>
                    <Card.Text>
                        <p className="texto-perfil"><b>Nombre:</b> {auth.nombre}</p>
                    </Card.Text>
                    <Card.Text>
                        <p className="texto-perfil"><b>Apellido:</b> {auth.apellido}</p>
                    </Card.Text>
                    <Card.Text>
                        <p className="texto-perfil"><b>Celular:</b> {auth.celular}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}