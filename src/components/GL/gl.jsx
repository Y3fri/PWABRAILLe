import React, { useEffect, useState } from 'react';
import { listGL } from '../../service/gl';
import Modalgl from './Modales/Modalgl';
import "./gl.css"
import { Link } from "react-router-dom";

const GL = () => {
    const [gl, setgl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [GlsPerPage] = useState(5);
    const [selectedGlId, setSelectedGlId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listGL(setgl);
        }
    }, []);

    const openModal = (GlId) => {
        setSelectedGlId(GlId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedGlId(null);
    };

    const updateGlList = async () => {
        await listGL(setgl);
    };

    const filteredGls = gl && gl.filter(Gl => {
        return Gl.gl_fecha.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastGl = currentPage * GlsPerPage;
    const indexOfFirstGl = indexOfLastGl - GlsPerPage;
    const currentGls = filteredGls && filteredGls.slice(indexOfFirstGl, indexOfLastGl);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = filteredGls ?
        Array.from({ length: Math.ceil(filteredGls.length / GlsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = filteredGls ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];

    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    <h1 className="title-conte">Evaluaciones </h1>
                    <div className="contenedor-productos">
                        <div className='header-product'>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Buscar por fecha"
                                className="input-search"
                            />
                            {showModal && <Modalgl closeModal={closeModal} updateGlList={updateGlList} GlId={selectedGlId} gls={gl} />}
                        </div>

                        {currentGls ? (
                            <>
                                <table className='tablaProducto'>
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Revisado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentGls.map(gl => (
                                            <tr key={gl.gl_id}>
                                                <td>{gl.gl_fecha}</td>
                                                <td>{gl.gl_hora}</td>
                                                <td>
                                                    {gl.nombre_estado === 'Activo' ? (
                                                        <button className="button-circle-green">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M5 12l5 5l10 -10" />
                                                            </svg>
                                                        </button>
                                                    ) : (
                                                        <button className="button-circle-red">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path d="M18 6l-12 12" />
                                                                <path d="M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    <button className="button-edit" onClick={() => openModal(gl.gl_id)}>Revisar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ul className="pagination">
                                    <li className="page-item">
                                        <button onClick={() => paginate(1)} className="page-link">&laquo;</button>
                                    </li>
                                    {pages.map(page => (
                                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                            <button onClick={() => paginate(page)} className="page-link">{page}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button onClick={() => paginate(pageNumbers.length)} className="page-link">&raquo;</button>
                                    </li>
                                </ul>
                            </>
                        ) : ('No hay Datos')}
                    </div>
                    <Link className="aVolver" to="../Result">Volver</Link>
                </main>
            )}
        </>
    );
};

export default GL;
