import React, { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

function Login() {
    const [auth, guardarAuth] = useContext(CRMContext);
    const [credenciales, guardarCredenciales] = useState({});
    const navigate = useNavigate();

    const iniciarSesion = async e => {
        e.preventDefault();

        try {
            const { data } = await clienteAxios.post('/iniciar-sesion', credenciales);
            const { token } = data;
            localStorage.setItem('token', token);

            guardarAuth({
                token,
                auth: true
            });

            Swal.fire(
                'Login Correcto',
                'Has iniciado sesión',
                'success'
            );

            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: error.response?.data?.mensaje || 'Error al iniciar sesión'
            });
        }
    };

    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>
            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email de inicio de sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password de inicio de sesión"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <input type="submit" value="Iniciar sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    );
}

export default Login;
