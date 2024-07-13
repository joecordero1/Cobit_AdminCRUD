import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function ObjetivoGobierno({ objetivo }) {
    const { id, codigo, descripcion } = objetivo;
    const navigate = useNavigate();

    const deleteObjetivo = id => {
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
                clienteAxios.delete(`/objetivosGobierno/${id}`)
                .then(res => {
                    Swal.fire("Eliminado", "El objetivo ha sido eliminado", "success");
                    navigate('/objetivosGobierno');
                })
                .catch(error => {
                    Swal.fire('Error', 'No se pudo eliminar el objetivo', 'error');
                });
            }
        });
    };

    return (
        <li className="objetivo">
            <div className="info-objetivo">
                <p className="codigo">Codigo: {codigo}</p>
                <p className="descripcion">Descripción: {descripcion}</p>
            </div>
            <div className="acciones">
                <Link to={`/objetivosGobierno/editar/${id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i> Editar Objetivo
                </Link>
                <button 
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteObjetivo(id)}>
                    <i className="fas fa-times"></i> Eliminar Objetivo
                </button>
            </div>
        </li>
    );
}

export default ObjetivoGobierno;
