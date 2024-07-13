import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';

function NuevaMetaAlineamientoGobierno() {
    const navigate = useNavigate();
    const [meta, guardarMeta] = useState({
        id_meta_alineamiento: '',
        id_objetivo_gobierno: '',
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
        
        clienteAxios.post('/metasAlineamientoGobierno', meta)
        .then(res => {
            Swal.fire('Agregado', 'La meta se agregó correctamente', 'success');
            navigate('/metasAlineamientoGobierno');
        })
        .catch(error => {
            console.error('Error al agregar la meta:', error.response ? error.response.data : error.message);
            Swal.fire('Error', error.response ? error.response.data.message : 'No se pudo agregar la meta', 'error');
        });
    };

    const validarMeta = () => {
        const { id_meta_alineamiento, id_objetivo_gobierno, nivel } = meta;
        return !id_meta_alineamiento || !id_objetivo_gobierno || !nivel;
    };

    return (
        <div>
            <h2>Nueva Meta de Alineamiento de Gobierno</h2>
            <form onSubmit={agregarMeta}>
                <div className="campo">
                    <label>ID Meta Alineamiento:</label>
                    <input type="text" name="id_meta_alineamiento" placeholder="ID Meta Alineamiento" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>ID Objetivo Gobierno:</label>
                    <input type="text" name="id_objetivo_gobierno" placeholder="ID Objetivo Gobierno" onChange={actualizarState} />
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

export default NuevaMetaAlineamientoGobierno;
