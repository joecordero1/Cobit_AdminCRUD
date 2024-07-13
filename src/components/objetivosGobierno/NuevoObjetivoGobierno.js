import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevoObjetivoGobierno() {
    const navigate = useNavigate();
    const [objetivo, guardarObjetivo] = useState({
        codigo: '',
        descripcion: ''
    });

    const actualizarState = e => {
        guardarObjetivo({
            ...objetivo,
            [e.target.name]: e.target.value
        });
    };

    const agregarObjetivo = e => {
        e.preventDefault();
        
        clienteAxios.post('/objetivosGobierno', objetivo)
        .then(res => {
            Swal.fire('Agregado', 'El objetivo se agregó correctamente', 'success');
            navigate('/objetivosGobierno');
        })
        .catch(error => {
            console.error('Error al agregar el objetivo:', error.response ? error.response.data : error.message);
            Swal.fire('Error', error.response ? error.response.data.message : 'No se pudo agregar el objetivo', 'error');
        });
    };

    const validarObjetivo = () => {
        const { codigo, descripcion } = objetivo;
        return !codigo || !descripcion;
    };

    return (
        <div>
            <h2>Nuevo Objetivo de Gobierno</h2>
            <form onSubmit={agregarObjetivo}>
                <div className="campo">
                    <label>Codigo del Objetivo:</label>
                    <input type="text" name="codigo" placeholder="Codigo del Objetivo" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Objetivo" disabled={validarObjetivo()} />
                </div>
            </form>
        </div>
    );
}

export default NuevoObjetivoGobierno;
