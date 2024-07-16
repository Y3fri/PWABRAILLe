import React, { useEffect, useState } from 'react';
import { listAF} from '../../service/af';
import Modal from './Modales/Modal';
import "./af.css"
import { Link } from "react-router-dom";

const AF = () => {
    const [af, setaf] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [AfsPerPage] = useState(5);
    const [selectedAfId, setSelectedAfId] = useState(null);

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listAF(setaf);
        }
    }, []);

    const [showModal, setShowModal] = useState(false);

    const openModal = (AfId) => {
        setShowModal(true);
        setSelectedAfId(AfId);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const updateAfList = async () => {
        await listAF(setaf);
    };
    
    const filteredAfs = af && af.filter(Af => {
        return Af.af_fecha.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Paginación
    const indexOfLastAf = currentPage * AfsPerPage;
    const indexOfFirstAf = indexOfLastAf - AfsPerPage;
    const currentAfs = filteredAfs && filteredAfs.slice(indexOfFirstAf, indexOfLastAf);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = filteredAfs ?
        Array.from({ length: Math.ceil(filteredAfs.length / AfsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = filteredAfs ?
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
                        {showModal && <Modal closeModal={closeModal} updateAfList={updateAfList} afId={selectedAfId} af={af} />}
                    </div>

                    {currentAfs ? (
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
                                    {currentAfs.map(af => (
                                        <tr key={af.af_id}>
                                            <td>{af.af_fecha}</td>
                                            <td>{af.af_hora}</td>                   
                                            <td>
                                                {af.af_estado === 'Activo' ? (
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
                                                <button className="button-edit" onClick={() => openModal(af.pro_id)}>Revisar</button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Paginación */}
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
                                    <button onClick={() => paginate(pages.length)} className="page-link">&raquo;</button>
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

export default AF;
