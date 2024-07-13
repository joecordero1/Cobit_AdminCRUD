import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import MetaAlineamientoGobierno from './MetaAlineamientoGobierno'; // Importa el componente individual de MetaAlineamientoGobierno

function MetasAlineamientoGobierno() {
    const [metas, setMetas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/metasAlineamientoGobierno');
                setMetas(respuesta.data);
            } catch (error) {
                console.error("Error al consultar la API:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al consultar las metas. Inténtalo más tarde.',
                });
            }
        };
        consultarAPI();
    }, [navigate]);

    return (
        <Fragment>
            <h2>Metas de Alineamiento de Gobierno</h2>
            <Link to="/metasAlineamientoGobierno/nueva" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nueva Meta
            </Link>
            <ul className="listado-metas">
                {metas.length === 0 ? (
                    <p>No hay metas disponibles.</p>
                ) : (
                    metas.map(meta => (
                        <MetaAlineamientoGobierno key={meta.id} meta={meta} />
                    ))
                )}
            </ul>
        </Fragment>
    );
}

export default MetasAlineamientoGobierno;
