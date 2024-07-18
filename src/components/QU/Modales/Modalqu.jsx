import React, { useState, useEffect } from 'react';
import { listQUById, updateQU } from '../../../service/qu';
import './Modal.css';

const Modal = ({ closeModal, updateQuList, QuId, qus }) => {
    const [formData, setFormData] = useState({
        qu_id: 0,
        qu_idestado: 0,
        qu_fecha: "",
        qu_hora: "",
        qu_unol: true,
        qu_dosl: true,
        qu_tresl: true,
        qu_cuatrol: true,
        qu_cincol: true,
        qu_seisl: true,
        qu_unos: true,
        qu_doss: true,
        qu_tress: true,
        qu_cuatros: true,
        qu_cincos: true,
        qu_seiss: true,
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [QuData, setQuData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const quDataResponse = await listQUById(QuId);
                setQuData(quDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false);
            }
        };

        if (QuId) {
            fetchData();
        }
    }, [QuId]);

    useEffect(() => {
        if (QuData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                qu_idestado: QuData.qu_idestado,
                qu_fecha: QuData.qu_fecha,
                qu_hora: QuData.qu_hora,
                qu_unol: QuData.qu_unol,
                qu_dosl: QuData.qu_dosl,
                qu_tresl: QuData.qu_tresl,
                qu_cuatrol: QuData.qu_cuatrol,
                qu_cincol: QuData.qu_cincol,
                qu_seisl: QuData.qu_seisl,
                qu_unos: QuData.qu_unos,
                qu_doss: QuData.qu_doss,
                qu_tress: QuData.qu_tress,
                qu_cuatros: QuData.qu_cuatros,
                qu_cincos: QuData.qu_cincos,
                qu_seiss: QuData.qu_seiss,
            }));
        }
    }, [QuData]);

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
            await updateQU(QuId, formData);
            updateQuList();
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
                    QuData && (
                        <>
                            <div className='row1-fecha'>
                                <h2 className="form-label">Fecha: {QuData.qu_fecha}</h2>
                                <h2 className="form-label">Hora: {QuData.qu_hora}</h2>
                            </div>
                            <div className='container-detailsaf'>

                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['qu_unol', 'qu_dosl', 'qu_tresl', 'qu_cuatrol', 'qu_cincol'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={QuData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={QuData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={QuData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['qu_unos', 'qu_doss', 'qu_tress', 'qu_cuatros', 'qu_cincos'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={QuData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={QuData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={QuData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    
                                </div>
                                <div className="language">
                                        <span className="en">Revisado</span>
                                        <input
                                            type="checkbox"
                                            name="qu_estado"
                                            className="check"
                                            checked={formData.qu_idestado === 2}
                                            onChange={(e) => {
                                                const value = e.target.checked ? 2 : 1;
                                                handleChange({ target: { name: 'qu_idestado', value } });
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
