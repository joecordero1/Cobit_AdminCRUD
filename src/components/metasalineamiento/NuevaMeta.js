// components/metas/NuevaMeta.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevaMeta() {
    const navigate = useNavigate();
    const [meta, guardarMeta] = useState({
        codigo: '',
        descripcion: ''
    });

    const actualizarState = e => {
        guardarMeta({
            ...meta,
            [e.target.name]: e.target.value
        });
    };

    const agregarMeta = e => {
        e.preventDefault();
        
        // Verifica los datos que se están enviando
        console.log('Datos a enviar:', meta);

        clienteAxios.post('/metas', meta)
        .then(res => {
            Swal.fire('Agregado', 'La meta se agregó correctamente', 'success');
            navigate('/metas');
        })
        .catch(error => {
            // Mostrar más detalles del error
            console.error('Error al agregar la meta:', error.response ? error.response.data : error.message);
            Swal.fire('Error', error.response ? error.response.data.message : 'No se pudo agregar la meta', 'error');
        });
    };

    const validarMeta = () => {
        const { codigo, descripcion } = meta;
        return !codigo || !descripcion;
    };

    return (
        <div>
            <h2>Nueva Meta</h2>
            <form onSubmit={agregarMeta}>
                <div className="campo">
                    <label>Codigo de la Meta:</label>
                    <input type="text" name="codigo" placeholder="Codigo de la Meta" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <textarea name="descripcion" placeholder="Descripción" onChange={actualizarState}></textarea>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Meta" disabled={validarMeta()} />
                </div>
            </form>
        </div>
    );
}

export default NuevaMeta;
