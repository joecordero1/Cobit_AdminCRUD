import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import MetaEmpresarialAlineamiento from './MetaEmpresarialAlineamiento'; // Importa el componente individual de MetaEmpresarialAlineamiento

function MetasEmpresarialesAlineamiento() {
    const [metas, setMetas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/metasEmpresarialesAlineamiento');
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
            <h2>Metas Empresariales Alineamiento</h2>
            <Link to="/metasEmpresarialesAlineamiento/nueva" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nueva Meta
            </Link>
            <ul className="listado-metas">
                {metas.length === 0 ? (
                    <p>No hay metas disponibles.</p>
                ) : (
                    metas.map(meta => (
                        <MetaEmpresarialAlineamiento key={meta.id} meta={meta} />
                    ))
                )}
            </ul>
        </Fragment>
    );
}

export default MetasEmpresarialesAlineamiento;
