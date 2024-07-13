import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';

const Navegacion = () => {
    const [auth] = useContext(CRMContext); // No es necesario 'guardarAuth' aquí

    if (!auth.auth) return null;

    return (
        <aside className="sidebar col-3">
            <h2>Administrar</h2>
            <nav className="navegacion">
                <Link to="/" className="metas">Metas</Link>
                <Link to="/metas" className="metas">Metas</Link>
                <Link to="/metasAlineamientoGobierno" className="metasAlineamientoGobierno">Metas Alineamiento-Gobierno</Link>
                <Link to="/metasEmpresariales" className="metasEmpresariales">Metas Empresariales</Link>
                <Link to="/metasEmpresarialesAlineamiento" className="metasEmpresarialesAlineamiento">Metas Empresariales Alineamiento</Link>
                <Link to="/objetivosGobierno" className="objetivosGobierno">Objetivos Gobierno</Link>
            </nav>
        </aside>
    );
}

export default Navegacion;
