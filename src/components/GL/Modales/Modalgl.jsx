import React, { useState, useEffect } from 'react';
import { listGLById, updateGL } from '../../../service/gl';
import './Modal.css';

const Modal = ({ closeModal, updateGlList, GlId, gls }) => {
    const [formData, setFormData] = useState({
        gl_id: 0,
        gl_idestado: 0,
        gl_fecha: "",
        gl_hora: "",
        gl_unol: true,
        gl_dosl: true,
        gl_tresl: true,
        gl_cuatrol: true,
        gl_cincol: true,
        gl_seisl: true,
        gl_unos: true,
        gl_doss: true,
        gl_tress: true,
        gl_cuatros: true,
        gl_cincos: true,
        gl_seiss: true,
        estado: {
            est_id: 0,
            est_nombre: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [GlData, setGlData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const glDataResponse = await listGLById(GlId);
                setGlData(glDataResponse[0]);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al obtener datos de sso_recogida o roles:", error.message);
                setIsLoading(false);
            }
        };

        if (GlId) {
            fetchData();
        }
    }, [GlId]);

    useEffect(() => {
        if (GlData) {
            setFormData(prevFormData => ({
                ...prevFormData,
                gl_idestado: GlData.gl_idestado,
                gl_fecha: GlData.gl_fecha,
                gl_hora: GlData.gl_hora,
                gl_unol: GlData.gl_unol,
                gl_dosl: GlData.gl_dosl,
                gl_tresl: GlData.gl_tresl,
                gl_cuatrol: GlData.gl_cuatrol,
                gl_cincol: GlData.gl_cincol,
                gl_seisl: GlData.gl_seisl,
                gl_unos: GlData.gl_unos,
                gl_doss: GlData.gl_doss,
                gl_tress: GlData.gl_tress,
                gl_cuatros: GlData.gl_cuatros,
                gl_cincos: GlData.gl_cincos,
                gl_seiss: GlData.gl_seiss,
            }));
        }
    }, [GlData]);

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
            await updateGL(GlId, formData);
            updateGlList();
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
                    GlData && (
                        <>
                            <div className='row1-fecha'>
                                <h2 className="form-label">Fecha: {GlData.gl_fecha}</h2>
                                <h2 className="form-label">Hora: {GlData.gl_hora}</h2>
                            </div>
                            <div className='container-detailsaf'>

                                <div className='preguntas'>
                                    <h2>Preguntas Lectura</h2>
                                    {['gl_unol', 'gl_dosl', 'gl_tresl', 'gl_cuatrol', 'gl_cincol', 'gl_seisl'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={GlData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={GlData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={GlData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                    <h2>Preguntas Escritura</h2>
                                    {['gl_unos', 'gl_doss', 'gl_tress', 'gl_cuatros', 'gl_cincos', 'gl_seiss'].map((key, index) => (
                                        <div key={index}>
                                            <p><strong> {index + 1}</strong></p>
                                            <button className={GlData[key] ? "button-circle-green" : "button-circle-red"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={GlData[key] ? "icon icon-tabler icon-tabler-check" : "icon icon-tabler icon-tabler-x"} width="10" height="10" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d={GlData[key] ? "M5 12l5 5l10 -10" : "M18 6l-12 12 M6 6l12 12"} />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                   
                                </div>
                                <div className="language">
                                        <span className="en">Revisado</span>
                                        <input
                                            type="checkbox"
                                            name="gl_estado"
                                            className="check"
                                            checked={formData.gl_idestado === 2}
                                            onChange={(e) => {
                                                const value = e.target.checked ? 2 : 1;
                                                handleChange({ target: { name: 'gl_idestado', value } });
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
