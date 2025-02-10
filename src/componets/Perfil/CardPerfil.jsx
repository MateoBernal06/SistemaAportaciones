
import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"
import Card from 'react-bootstrap/Card';

export const CardPerfil = () => {
    const { auth } = useContext(AuthContext)
    return (
        <div className="lugar-card">
            <Card className='card-perfil'>
                <Card.Img variant="top" className='logo-perfil' src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" />
                <Card.Body>
                    <Card.Title>Datos del tesorero</Card.Title>
                    <Card.Text>
                        <b>Nombre:</b> {auth.nombre}
                    </Card.Text>
                    <Card.Text>
                        <b>Apellido:</b> {auth.apellido}
                    </Card.Text>
                    <Card.Text>
                        <b>Celular:</b> {auth.celular}
                    </Card.Text>
                    <Card.Text>
                        <b>Email:</b> {auth.email}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}