import React, { Fragment, useContext, useState } from 'react';

// Routing
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './components/layout/Header';
import Navegacion from './components/layout/Navegacion';

import Login from './components/auth/Login';
import { CRMContext, CRMProvider } from './context/CRMContext';
import Metas from './components/metasalineamiento/Metas';
import NuevaMeta from './components/metasalineamiento/NuevaMeta';
import EditarMeta from './components/metasalineamiento/EditarMeta';

import MetasAlineamientoGobierno from './components/metasAlineamientoGobierno/MetasAlineamientoGobierno';
import NuevaMetaAlineamientoGobierno from './components/metasAlineamientoGobierno/NuevaMetaAlineamientoGobierno';
import EditarMetaAlineamientoGobierno from './components/metasAlineamientoGobierno/EditarMetaAlineamientoGobierno';

import MetasEmpresariales from './components/metasempresariales/MetasEmpresariales';
import NuevaMetaEmpresarial from './components/metasempresariales/NuevaMetaEmpresarial';
import EditarMetaEmpresarial from './components/metasempresariales/EditarMetaEmpresarial';

import MetasEmpresarialesAlineamiento from './components/metasEmpresarialesAlineamiento/MetasEmpresarialesAlineamiento';
import NuevaMetaEmpresarialAlineamiento from './components/metasEmpresarialesAlineamiento/NuevaMetaEmpresarialAlineamiento';
import EditarMetaEmpresarialAlineamiento from './components/metasEmpresarialesAlineamiento/EditarMetaEmpresarialAlineamiento';

import ObjetivosGobierno from './components/objetivosGobierno/ObjetivosGobierno';
import NuevoObjetivoGobierno from './components/objetivosGobierno/NuevoObjetivoGobierno';
import EditarObjetivoGobierno from './components/objetivosGobierno/EditarObjetivoGobierno';


function App() {
    // UTILIZAR EL CONTEXT
    const [auth, guardarAuth] = useContext(CRMContext);

    return (
        <Router>
            <Fragment>
                <CRMProvider value={[auth, guardarAuth]}>
                    <Header />

                    <div className="grid contenedor contenido-principal">
                        <Navegacion />
                        <main className="caja-contenido col-9">
                            <Routes>
                                <Route path="/iniciar-sesion" element={<Login />} />

                                <Route path="/" element={<Metas />} />

                                <Route path="/metas" element={<Metas />} />
                                <Route path="/metas/nueva" element={<NuevaMeta />} />
                                <Route path="/metas/editar/:id" element={<EditarMeta />} />

                                <Route path="/metasAlineamientoGobierno" element={<MetasAlineamientoGobierno />} />
                                <Route path="/metasAlineamientoGobierno/nueva" element={<NuevaMetaAlineamientoGobierno />} />
                                <Route path="/metasAlineamientoGobierno/editar/:id" element={<EditarMetaAlineamientoGobierno />} />

                                <Route path="/metasEmpresariales" element={<MetasEmpresariales />} />
                                <Route path="/metasEmpresariales/nueva" element={<NuevaMetaEmpresarial />} />
                                <Route path="/metasEmpresariales/editar/:id" element={<EditarMetaEmpresarial />} />

                                <Route path="/metasEmpresarialesAlineamiento" element={<MetasEmpresarialesAlineamiento />} />
                                <Route path="/metasEmpresarialesAlineamiento/nueva" element={<NuevaMetaEmpresarialAlineamiento />} />
                                <Route path="/metasEmpresarialesAlineamiento/editar/:id" element={<EditarMetaEmpresarialAlineamiento />} />

                                <Route path="/objetivosGobierno" element={<ObjetivosGobierno />} />
                                <Route path="/objetivosGobierno/nuevo" element={<NuevoObjetivoGobierno />} />
                                <Route path="/objetivosGobierno/editar/:id" element={<EditarObjetivoGobierno />} />
                            </Routes>
                        </main>
                    </div>
                </CRMProvider>
            </Fragment>
        </Router>
    );
}

export default App;
