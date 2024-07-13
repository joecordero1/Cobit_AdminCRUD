import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevaMetaEmpresarialAlineamiento() {
    const navigate = useNavigate();
    const [meta, guardarMeta] = useState({
        id_meta_empresarial: '',
        id_meta_alineamiento: '',
        nivel: ''
    });

    const actualizarState = e => {
        guardarMeta({
            ...meta,
            [e.target.name]: e.target.value
        });
    };

    const agregarMeta = e => {
        e.preventDefault();
        
        clienteAxios.post('/metasEmpresarialesAlineamiento', meta)
        .then(res => {
            Swal.fire('Agregado', 'La meta se agregó correctamente', 'success');
            navigate('/metasEmpresarialesAlineamiento');
        })
        .catch(error => {
            console.error('Error al agregar la meta:', error.response ? error.response.data : error.message);
            Swal.fire('Error', error.response ? error.response.data.message : 'No se pudo agregar la meta', 'error');
        });
    };

    const validarMeta = () => {
        const { id_meta_empresarial, id_meta_alineamiento, nivel } = meta;
        return !id_meta_empresarial || !id_meta_alineamiento || !nivel;
    };

    return (
        <div>
            <h2>Nueva Meta Empresarial Alineamiento</h2>
            <form onSubmit={agregarMeta}>
                <div className="campo">
                    <label>ID Meta Empresarial:</label>
                    <input type="text" name="id_meta_empresarial" placeholder="ID Meta Empresarial" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>ID Meta Alineamiento:</label>
                    <input type="text" name="id_meta_alineamiento" placeholder="ID Meta Alineamiento" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Nivel:</label>
                    <input type="text" name="nivel" placeholder="Nivel" onChange={actualizarState} />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Meta" disabled={validarMeta()} />
                </div>
            </form>
        </div>
    );
}

export default NuevaMetaEmpresarialAlineamiento;
