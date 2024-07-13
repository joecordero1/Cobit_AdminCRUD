import React, { Fragment, useEffect, useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function EditarMetaEmpresarial() {
    const { id } = useParams();
    const [auth] = useContext(CRMContext);
    const navigate = useNavigate();

    const [metaActual, guardarMetaActual] = useState({
        codigo: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const metaConsulta = await clienteAxios.get(`/metasEmpresariales/${id}`, {
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

        clienteAxios.put(`/metasEmpresariales/${metaActual.id}`, metaActual, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        .then(res => {
            Swal.fire('Actualizado', res.data.mensaje, 'success');
            navigate('/metasEmpresariales');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar la meta', 'error');
        });
    }

    const validarMeta = () => {
        const { codigo, descripcion } = metaActual;
        return !codigo || !descripcion;
    }

    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <Fragment>
            <h2>Editar Meta Empresarial</h2>

            <form onSubmit={actualizarMeta}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Codigo de la Meta:</label>
                    <input type="text"
                        placeholder="Codigo de la Meta"
                        name="codigo"
                        onChange={actualizarState}
                        value={metaActual.codigo}
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

export default EditarMetaEmpresarial;
