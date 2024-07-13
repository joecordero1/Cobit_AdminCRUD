// components/metas/EditarMeta.js
import React, { Fragment, useEffect, useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function EditarMeta() {
    const { id } = useParams();
    const [auth] = useContext(CRMContext);
    const navigate = useNavigate();

    const [metaActual, guardarMetaActual] = useState({
        nombre: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const metaConsulta = await clienteAxios.get(`/metas/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarMetaActual(metaConsulta.data);
        }
        consultarAPI();
    }, [id, auth.token]);

    const actualizarState = e => {
        guardarMetaActual({
            ...metaActual,
            [e.target.name]: e.target.value
        });
    }

    const actualizarMeta = e => {
        e.preventDefault();

        clienteAxios.put(`/metas/${metaActual.id}`, metaActual, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        .then(res => {
            Swal.fire('Actualizado', res.data.mensaje, 'success');
            navigate('/metas');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar la meta', 'error');
        });
    }

    const validarMeta = () => {
        const { nombre, descripcion } = metaActual;
        return !nombre || !nombre.length || !descripcion || !descripcion.length;
    }

    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <Fragment>
            <h2>Editar Meta</h2>

            <form onSubmit={actualizarMeta}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre de la Meta:</label>
                    <input type="text"
                        placeholder="Nombre de la Meta"
                        name="nombre"
                        onChange={actualizarState}
                        value={metaActual.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input type="text"
                        placeholder="Descripción de la Meta"
                        name="descripcion"
                        onChange={actualizarState}
                        value={metaActual.descripcion}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Actualizar Meta"
                        disabled={validarMeta()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarMeta;
