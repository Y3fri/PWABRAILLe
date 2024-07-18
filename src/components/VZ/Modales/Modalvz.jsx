import React, { useState, useEffect } from 'react';
import { listVZById, updateVZ } from '../../../service/vz';
import './Modal.css';

const Modal = ({ closeModal, updateVzList, VzId, vzs }) => {
    const [formData, setFormData] = useState({
        vz_id: 0,
        vz_idestado: 0,
        vz_fecha: "",
        vz_hora: "",
        vz_unol: true,
        vz_dosl: true,
        vz_tresl: true,
        vz_cuatrol: true,
        vz_cincol: true,
        vz_seisl: true,
        vz_unos: true,
        vz_doss: true,
        vz_tress: true,
        vz_cuatros: true,
        vz_cincos: true,
        vz_seiss: true,
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [VzData, setVzData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const vzDataResponse = await listVZById(VzId);
                setVzData(vzDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false);
            }
        };

        if (VzId) {
            fetchData();
        }
    }, [VzId]);

    useEffect(() => {
        if (VzData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                vz_idestado: VzData.vz_idestado,
                vz_fecha: VzData.vz_fecha,
                vz_hora: VzData.vz_hora,
                vz_unol: VzData.vz_unol,
                vz_dosl: VzData.vz_dosl,
                vz_tresl: VzData.vz_tresl,
                vz_cuatrol: VzData.vz_cuatrol,
                vz_cincol: VzData.vz_cincol,
                vz_seisl: VzData.vz_seisl,
                vz_unos: VzData.vz_unos,
                vz_doss: VzData.vz_doss,
                vz_tress: VzData.vz_tress,
                vz_cuatros: VzData.vz_cuatros,
                vz_cincos: VzData.vz_cincos,
                vz_seiss: VzData.vz_seiss,
            }));
        }
    }, [VzData]);

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
            await updateVZ(VzId, formData);
            updateVzList();
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
                    VzData && (
                        <>
                            <div className='row1-fecha'>
                                <label className="form-label">Fecha: {VzData.vz_fecha}</label>
                                <label className="form-label">Hora: {VzData.vz_hora}</label>
                            </div>
                            <div className='container-detailsaf'>

                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['vz_unol', 'vz_dosl', 'vz_tresl', 'vz_cuatrol', 'vz_cincol'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={VzData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={VzData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={VzData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['vz_unos', 'vz_doss', 'vz_tress', 'vz_cuatros', 'vz_cincos'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={VzData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={VzData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={VzData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    
                                </div>
                                <div className="language">
                                        <span className="en">Revisado</span>
                                        <input
                                            type="checkbox"
                                            name="vz_estado"
                                            className="check"
                                            checked={formData.vz_idestado === 2}
                                            onChange={(e) => {
                                                const value = e.target.checked ? 2 : 1;
                                                handleChange({ target: { name: 'vz_idestado', value } });
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
