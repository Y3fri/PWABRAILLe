import React, { useState, useEffect } from 'react';
import { listAFById, updateAF } from '../../../service/af';
import './Modal.css';

const Modal = ({ closeModal, updateAfList, AfId, afs }) => {
    const [formData, setFormData] = useState({
        af_id: 0,
        af_idestado: 0,
        af_fecha: "",
        af_hora: "",
        af_unol: true,
        af_dosl: true,
        af_tresl: true,
        af_cuatrol: true,
        af_cincol: true,
        af_seisl: true,
        af_unos: true,
        af_doss: true,
        af_tress: true,
        af_cuatros: true,
        af_cincos: true,
        af_seiss: true,
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [AfData, setAfData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const afDataResponse = await listAFById(AfId);
                setAfData(afDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false);
            }
        };

        if (AfId) {
            fetchData();
        }
    }, [AfId]);

    useEffect(() => {
        if (AfData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                af_idestado: AfData.af_idestado,
                af_fecha: AfData.af_fecha,
                af_hora: AfData.af_hora,
                af_unol: AfData.af_unol,
                af_dosl: AfData.af_dosl,
                af_tresl: AfData.af_tresl,
                af_cuatrol: AfData.af_cuatrol,
                af_cincol: AfData.af_cincol,
                af_seisl: AfData.af_seisl,
                af_unos: AfData.af_unos,
                af_doss: AfData.af_doss,
                af_tress: AfData.af_tress,
                af_cuatros: AfData.af_cuatros,
                af_cincos: AfData.af_cincos,
                af_seiss: AfData.af_seiss,
            }));
        }
    }, [AfData]);

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
            await updateAF(AfId, formData);
            updateAfList();
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
                        AfData && (
                            <>
                                <div className='row1-fecha'>
                                    <h2 className="form-label">Fecha: {AfData.af_fecha}</h2>
                                    <h2 className="form-label">Hora: {AfData.af_hora}</h2>
                                </div>

                    <div className='container-detailsaf'>
                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['af_unol', 'af_dosl', 'af_tresl', 'af_cuatrol', 'af_cincol', 'af_seisl'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={AfData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={AfData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={AfData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['af_unos', 'af_doss', 'af_tress', 'af_cuatros', 'af_cincos', 'af_seiss'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={AfData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={AfData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={AfData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    
                                </div> 
                                <div className="language">
                                        <span className="en">Revisado</span>
                                        <input
                                            type="checkbox"
                                            name="af_estado"
                                            className="check"
                                            checked={formData.af_idestado === 2}
                                            onChange={(e) => {
                                                const value = e.target.checked ? 2 : 1;
                                                handleChange({ target: { name: 'af_idestado', value } });
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
