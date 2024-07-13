import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function MetaAlineamientoGobierno({ meta }) {
    const { id, id_meta_alineamiento, id_objetivo_gobierno, nivel } = meta;
    const navigate = useNavigate();

    const deleteMeta = id => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede revertir",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/metasAlineamientoGobierno/${id}`)
                .then(res => {
                    Swal.fire("Eliminado", "La meta ha sido eliminada", "success");
                    navigate('/metasAlineamientoGobierno');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar la meta', 'error');
                });
            }
        });
    };

    return (
        <li className="meta">
            <div className="info-meta">
                <p className="nombre">Meta Alineamiento ID: {id_meta_alineamiento}</p>
                <p className="descripcion">Objetivo Gobierno ID: {id_objetivo_gobierno}</p>
                <p className="nivel">Nivel: {nivel}</p>
            </div>
            <div className="acciones">
                <Link to={`/metasAlineamientoGobierno/editar/${id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Meta
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteMeta(id)}>
                    <i className="fas fa-times"></i> Eliminar Meta
                </button>
            </div>
        </li>
    );
}

export default MetaAlineamientoGobierno;
