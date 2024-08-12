import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1>Error 404 - Página no encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/">Ir al Inicio</Link>
        </div>
    );
};

export default ErrorPage;