import React, { Fragment, useEffect, useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function EditarObjetivoGobierno() {
    const { id } = useParams();
    const [auth] = useContext(CRMContext);
    const navigate = useNavigate();

    const [objetivoActual, guardarObjetivoActual] = useState({
        codigo: '',
        descripcion: ''
    });

    useEffect(() => {
        const consultarAPI = async () => {
            const objetivoConsulta = await clienteAxios.get(`/objetivosGobierno/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            guardarObjetivoActual(objetivoConsulta.data);
        }
        consultarAPI();
    }, [id, auth.token]);

    const actualizarState = e => {
        guardarObjetivoActual({
            ...objetivoActual,
            [e.target.name]: e.target.value
        });
    }

    const actualizarObjetivo = e => {
        e.preventDefault();

        clienteAxios.put(`/objetivosGobierno/${objetivoActual.id}`, objetivoActual, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        .then(res => {
            Swal.fire('Actualizado', res.data.mensaje, 'success');
            navigate('/objetivosGobierno');
        })
        .catch(error => {
            Swal.fire('Error', 'No se pudo actualizar el objetivo', 'error');
        });
    }

    const validarObjetivo = () => {
        const { codigo, descripcion } = objetivoActual;
        return !codigo || !descripcion;
    }

    useEffect(() => {
        if (!auth.auth || localStorage.getItem('token') !== auth.token) {
            navigate('/iniciar-sesion');
        }
    }, [auth, navigate]);

    return (
        <Fragment>
            <h2>Editar Objetivo de Gobierno</h2>

            <form onSubmit={actualizarObjetivo}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Codigo del Objetivo:</label>
                    <input type="text"
                        placeholder="Codigo del Objetivo"
                        name="codigo"
                        onChange={actualizarState}
                        value={objetivoActual.codigo}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input type="text"
                        placeholder="Descripción del Objetivo"
                        name="descripcion"
                        onChange={actualizarState}
                        value={objetivoActual.descripcion}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Actualizar Objetivo"
                        disabled={validarObjetivo()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarObjetivoGobierno;
