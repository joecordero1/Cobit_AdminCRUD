// components/metas/Metas.js
import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Meta from './Meta'; // Importa el componente individual de Meta

function Metas() {
    const [metas, setMetas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/metas');
                setMetas(respuesta.data);
            } catch (error) {
                console.error("Error al consultar la API:", error);
                /*if (error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso denegado',
                        text: 'Debes iniciar sesión para acceder a esta sección',
                    }).then(() => {
                        navigate('/iniciar-sesion');
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al consultar las metas. Inténtalo más tarde.',
                    });
                }*/
            }
        };
        consultarAPI();
    }, [navigate]);

    return (
        <Fragment>
            <h2>Metas</h2>
            <Link to="/metas/nueva" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nueva Meta
            </Link>
            <ul className="listado-metas">
                {metas.length === 0 ? (
                    <p>No hay metas disponibles.</p>
                ) : (
                    metas.map(meta => (
                        <Meta key={meta.id} meta={meta} />
                    ))
                )}
            </ul>
        </Fragment>
    );
}

export default Metas;