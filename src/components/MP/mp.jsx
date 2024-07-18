import React, { useEffect, useState } from 'react';
import { listMP } from '../../service/mp';
import Modalmp from './Modales/Modalmp';
import "./mp.css"
import { Link } from "react-router-dom";

const MP = () => {
    const [mp, setmp] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [MpsPerPage] = useState(5);
    const [selectedMpId, setSelectedMpId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listMP(setmp);
        }
    }, []);

    const openModal = (MpId) => {
        setSelectedMpId(MpId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMpId(null);
    };

    const updateMpList = async () => {
        await listMP(setmp);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredMps = mp && mp.filter(Mp => {
        return Mp.mp_fecha.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const reversedMps = filteredMps ? [...filteredMps].reverse() : null;

    const indexOfLastMp = currentPage * MpsPerPage;
    const indexOfFirstMp = indexOfLastMp - MpsPerPage;
    const currentMps = reversedMps && reversedMps.slice(indexOfFirstMp, indexOfLastMp);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = reversedMps ?
        Array.from({ length: Math.ceil(reversedMps.length / MpsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = reversedMps ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];


    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    <h1 className="title-conte">Evaluaciones MP</h1>
                    <div className="contenedor-productos">
                        <div className='header-product'>
                            <div className="search-container">
                                <input
                                    type="Date"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por fecha"
                                    className="input-search"
                                />
                                {searchTerm && (
                                    <button className="clear-button" onClick={handleClearSearch}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            {showModal && <Modalmp closeModal={closeModal} updateMpList={updateMpList} MpId={selectedMpId} mps={mp} />}
                        </div>

                        {currentMps ? (
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
                                        {currentMps.map(mp => (
                                            <tr key={mp.mp_id}>
                                                <td>{mp.mp_fecha}</td>
                                                <td>{mp.mp_hora}</td>
                                                <td>
                                                    {mp.nombre_estado === 'Activo' ? (
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
                                                    <button className="button-edit" onClick={() => openModal(mp.mp_id)}>Revisar</button>
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

export default MP;
