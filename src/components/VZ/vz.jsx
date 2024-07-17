import React, { useEffect, useState } from 'react';
import { listVZ } from '../../service/vz';
import Modalvz from './Modales/Modalvz';
import "./vz.css"
import { Link } from "react-router-dom";

const VZ = () => {
    const [vz, setvz] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [VzsPerPage] = useState(5);
    const [selectedVzId, setSelectedVzId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            listVZ(setvz);
        }
    }, []);

    const openModal = (VzId) => {
        setSelectedVzId(VzId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedVzId(null);
    };

    const updateVzList = async () => {
        await listVZ(setvz);
    };

    const filteredVzs = vz && vz.filter(Vz => {
        return Vz.vz_fecha.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastVz = currentPage * VzsPerPage;
    const indexOfFirstVz = indexOfLastVz - VzsPerPage;
    const currentVzs = filteredVzs && filteredVzs.slice(indexOfFirstVz, indexOfLastVz);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = filteredVzs ?
        Array.from({ length: Math.ceil(filteredVzs.length / VzsPerPage) }, (_, i) => i + 1) :
        [];
    const pages = filteredVzs ?
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
                            {showModal && <Modalvz closeModal={closeModal} updateVzList={updateVzList} VzId={selectedVzId} vzs={vz} />}
                        </div>

                        {currentVzs ? (
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
                                        {currentVzs.map(vz => (
                                            <tr key={vz.vz_id}>
                                                <td>{vz.vz_fecha}</td>
                                                <td>{vz.vz_hora}</td>
                                                <td>
                                                    {vz.nombre_estado === 'Activo' ? (
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
                                                    <button className="button-edit" onClick={() => openModal(vz.vz_id)}>Revisar</button>
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

export default VZ;
