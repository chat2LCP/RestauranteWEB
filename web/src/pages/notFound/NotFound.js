import './NotFound.scss'
import { Apple } from 'react-bootstrap-icons';

function NotFound() {
    return(
        <>
            <div className="page-not-found-container">
                <Apple size={92} color='#198754'></Apple>
                <h1>404 - Página não encontrada</h1>
            </div>   
        </>
    )
}

export default NotFound