import React, { useEffect, useState, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import ObjetivoGobierno from './ObjetivoGobierno'; // Importa el componente individual de ObjetivoGobierno

function ObjetivosGobierno() {
    const [objetivos, setObjetivos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const respuesta = await clienteAxios.get('/objetivosGobierno');
                setObjetivos(respuesta.data);
            } catch (error) {
                console.error("Error al consultar la API:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al consultar los objetivos. Inténtalo más tarde.',
                });
            }
        };
        consultarAPI();
    }, [navigate]);

    return (
        <Fragment>
            <h2>Objetivos de Gobierno</h2>
            <Link to="/objetivosGobierno/nuevo" className="btn btn-verde">
                <i className="fas fa-plus-circle"></i> Nuevo Objetivo
            </Link>
            <ul className="listado-objetivos">
                {objetivos.length === 0 ? (
                    <p>No hay objetivos disponibles.</p>
                ) : (
                    objetivos.map(objetivo => (
                        <ObjetivoGobierno key={objetivo.id} objetivo={objetivo} />
                    ))
                )}
            </ul>
        </Fragment>
    );
}

export default ObjetivosGobierno;
