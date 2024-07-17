import React, { useState, useEffect } from 'react';
import { listMPById, updateMP } from '../../../service/mp';
import './Modal.css';

const Modal = ({ closeModal, updateMpList, MpId, mps }) => {
    const [formData, setFormData] = useState({

        mp_id: 0,
        mp_idestado: 0,
        mp_fecha: "2024-07-17",
        mp_hora: "01:55:58.753Z",
        mp_unol: true,
        mp_dosl: true,
        mp_tresl: true,
        mp_cuatrol: true,
        mp_cincol: true,        
        mp_unos: true,
        mp_doss: true,
        mp_tress: true,
        mp_cuatros: true,
        mp_cincos: true,        
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [currentMp, setCurrentMp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [MpData, setMpData] = useState(null);


    useEffect(() => {
        if (MpId && mps) {
            const mpToUpdate = mps.find(mp => mp.mp_id === MpId);
            setCurrentMp(mpToUpdate);
        }
    }, [MpId, mps]);

    useEffect(() => {
        if (currentMp) {
            setFormData(prevFormData => ({
                ...prevFormData,
                mp_idestado: currentMp.mp_idestado,
                mp_fecha: currentMp.mp_fecha,
                mp_hora: currentMp.mp_hora,
                mp_unol: currentMp.mp_unol,
                mp_dosl: currentMp.mp_dosl,
                mp_tresl: currentMp.mp_tresl,
                mp_cuatrol: currentMp.mp_cuatrol,
                mp_cincol: currentMp.mp_cincol,                
                mp_unos: currentMp.mp_unos,
                mp_doss: currentMp.mp_doss,
                mp_tress: currentMp.mp_tress,
                mp_cuatros: currentMp.mp_cuatros,
                mp_cincos: currentMp.mp_cincos,                
            }));
        }
    }, [currentMp]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                const mpDataResponse = await listMPById(MpId);
                setMpData(mpDataResponse[0]);

                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false);
            }
        };

        fetchData();

    }, [MpId]);



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (MpId) {
                await updateMP(MpId, formData);
            } else {
                console.error("Error al enviar el formulario:");
            }
            updateMpList();
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        }
    };



    return (
        <div className="modal-container">
            <div className="modal-content">
                <span className="close-button" onClick={closeModal}>&times;</span>
                <h2>Asignar Recogida</h2>

                <div className='container-details'>
                    <div className='row1-fecha'>

                        {MpData && (
                            <>
                                <div className='container-details'>
                                    <div className='row1'>
                                        <div className="recogida-data">
                                        <label className="form-label">Fecha: {MpData.mp_fecha}</label>
                                        <label className="form-label">Hora: {MpData.mp_hora}</label>
                                            <h2>Lectura</h2>
                                            <div className="recogida-materiales">
                                                <p><strong>Pregunta 1:</strong>
                                                    {MpData.mp_unol === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 2:</strong>
                                                    {MpData.mp_dosl === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 3:</strong>
                                                    {MpData.mp_tresl === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 4:</strong>
                                                    {MpData.mp_cuatrol === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 5:</strong>
                                                    {MpData.mp_cincol === true ? (
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
                                                </p>                                                
                                                <h2>Escritura</h2>
                                                <p><strong>Pregunta 1:</strong>
                                                    {MpData.mp_unos === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 2:</strong>
                                                    {MpData.mp_doss === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 3:</strong>
                                                    {MpData.mp_tress === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 4:</strong>
                                                    {MpData.mp_cuatros === true ? (
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
                                                </p>
                                                <p><strong>Pregunta 5:</strong>
                                                    {MpData.mp_cincos === true ? (
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
                                                </p>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="language">
                            <span className="en">Revisado</span>
                            <input
                                type="checkbox"
                                name="mp_estado"
                                className="check"
                                checked={formData.mp_idestado === 2}
                                onChange={(e) => {
                                    const value = e.target.checked ? 2 : 1;
                                    handleChange({ target: { name: 'mp_idestado', value } });
                                }}
                            />
                            <span className="es">Sin revisar</span>
                        </div>
                    </div>
                </div>


                <form onSubmit={handleSubmit} >
                    <button type="submit" className="form-button">Guardar cambios</button>
                    <button type="button" onClick={closeModal} className="close-modal-button">Cerrar</button>
                </form>
                {isLoading && (
                    <div className="LoadingModal">
                        <div className="LoadingSpinner"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
