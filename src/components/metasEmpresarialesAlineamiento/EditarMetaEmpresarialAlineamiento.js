import React, { Fragment, useEffect, useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function EditarMetaEmpresarialAlineamiento() {
    const { id } = useParams();
    const [auth] = useContext(CRMContext);
    const navigate = useNavigate();

    const [metaActual, guardarMetaActual] = useState({
        id_meta_empresarial: '',
        id_meta_alineamiento: '',
        nivel: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const metaConsulta = await clienteAxios.get(`/metasEmpresarialesAlineamiento/${id}`, {
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

        clienteAxios.put(`/metasEmpresarialesAlineamiento/${metaActual.id}`, metaActual, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        .then(res => {
            Swal.fire('Actualizado', res.data.mensaje, 'success');
            navigate('/metasEmpresarialesAlineamiento');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar la meta', 'error');
        });
    }

    const validarMeta = () => {
        const { id_meta_empresarial, id_meta_alineamiento, nivel } = metaActual;
        return !id_meta_empresarial || !id_meta_alineamiento || !nivel;
    }

    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <Fragment>
            <h2>Editar Meta Empresarial Alineamiento</h2>

            <form onSubmit={actualizarMeta}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>ID Meta Empresarial:</label>
                    <input type="text"
                        placeholder="ID Meta Empresarial"
                        name="id_meta_empresarial"
                        onChange={actualizarState}
                        value={metaActual.id_meta_empresarial}
                    />
                </div>

                <div className="campo">
                    <label>ID Meta Alineamiento:</label>
                    <input type="text"
                        placeholder="ID Meta Alineamiento"
                        name="id_meta_alineamiento"
                        onChange={actualizarState}
                        value={metaActual.id_meta_alineamiento}
                    />
                </div>

                <div className="campo">
                    <label>Nivel:</label>
                    <input type="text"
                        placeholder="Nivel"
                        name="nivel"
                        onChange={actualizarState}
                        value={metaActual.nivel}
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

export default EditarMetaEmpresarialAlineamiento;
