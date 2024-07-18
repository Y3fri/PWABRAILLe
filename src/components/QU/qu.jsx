import React, { useEffect, useState } from 'react';
import { listQU } from '../../service/qu';
import Modalqu from './Modales/Modalqu';
import "./qu.css"
import { Link } from "react-router-dom";

const QU = () => {
    const [qu, setqu] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [QusPerPage] = useState(5);
    const [selectedQuId, setSelectedQuId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listQU(setqu);
        }
    }, []);

    const openModal = (QuId) => {
        setSelectedQuId(QuId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedQuId(null);
    };

    const updateQuList = async () => {
        await listQU(setqu);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
    };


    const filteredQus = qu && qu.filter(Qu => {
        return Qu.qu_fecha.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const reversedQus = filteredQus ? [...filteredQus].reverse() : null;

    const indexOfLastQu = currentPage * QusPerPage;
    const indexOfFirstQu = indexOfLastQu - QusPerPage;
    const currentQus = reversedQus && reversedQus.slice(indexOfFirstQu, indexOfLastQu);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = reversedQus ?
        Array.from({ length: Math.ceil(reversedQus.length / QusPerPage) }, (_, i) => i + 1) :
        [];
    const pages = reversedQus ?
        Array.from({ length: Math.min(5, pageNumbers.length) }, (_, i) => i + Math.max(1, Math.min(currentPage - 2, pageNumbers.length - 4))) :
        [];


    return (
        <>
            {isLoggedIn && (
                <main className="main-producto">
                    <h1 className="title-conte">Evaluaciones QU</h1>
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

                            {showModal && <Modalqu closeModal={closeModal} updateQuList={updateQuList} QuId={selectedQuId} qus={qu} />}
                        </div>

                        {currentQus ? (
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
                                        {currentQus.map(qu => (
                                            <tr key={qu.qu_id}>
                                                <td>{qu.qu_fecha}</td>
                                                <td>{qu.qu_hora}</td>
                                                <td>
                                                    {qu.nombre_estado === 'Activo' ? (
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
                                                    <button className="button-edit" onClick={() => openModal(qu.qu_id)}>Revisar</button>
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

export default QU;
