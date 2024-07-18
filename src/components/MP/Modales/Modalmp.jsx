import React, { useState, useEffect } from 'react';
import { listMPById, updateMP } from '../../../service/mp';
import './Modal.css';

const Modal = ({ closeModal, updateMpList, MpId, mps }) => {
    const [formData, setFormData] = useState({
        mp_id: 0,
        mp_idestado: 0,
        mp_fecha: "",
        mp_hora: "",
        mp_unol: true,
        mp_dosl: true,
        mp_tresl: true,
        mp_cuatrol: true,
        mp_cincol: true,
        mp_seisl: true,
        mp_unos: true,
        mp_doss: true,
        mp_tress: true,
        mp_cuatros: true,
        mp_cincos: true,
        mp_seiss: true,
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [MpData, setMpData] = useState(null);

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

        if (MpId) {
            fetchData();
        }
    }, [MpId]);

    useEffect(() => {
        if (MpData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                mp_idestado: MpData.mp_idestado,
                mp_fecha: MpData.mp_fecha,
                mp_hora: MpData.mp_hora,
                mp_unol: MpData.mp_unol,
                mp_dosl: MpData.mp_dosl,
                mp_tresl: MpData.mp_tresl,
                mp_cuatrol: MpData.mp_cuatrol,
                mp_cincol: MpData.mp_cincol,
                mp_seisl: MpData.mp_seisl,
                mp_unos: MpData.mp_unos,
                mp_doss: MpData.mp_doss,
                mp_tress: MpData.mp_tress,
                mp_cuatros: MpData.mp_cuatros,
                mp_cincos: MpData.mp_cincos,
                mp_seiss: MpData.mp_seiss,
            }));
        }
    }, [MpData]);

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
            await updateMP(MpId, formData);
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
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    MpData && (
                        <>
                            <div className='row1-fecha'>
                                <h2 className="form-label">Fecha: {MpData.mp_fecha}</h2>
                                <h2 className="form-label">Hora: {MpData.mp_hora}</h2>
                            </div>
                            <div className='container-detailsaf'>
                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['mp_unol', 'mp_dosl', 'mp_tresl', 'mp_cuatrol', 'mp_cincol'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={MpData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={MpData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={MpData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['mp_unos', 'mp_doss', 'mp_tress', 'mp_cuatros', 'mp_cincos'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={MpData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={MpData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={MpData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    
                                </div>
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
                        </>
                    )
                )}
                <form onSubmit={handleSubmit}>
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
