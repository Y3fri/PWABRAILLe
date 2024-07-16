import React, { useState, useEffect } from 'react';
import './Modal.css';


const Modal = (closeModal) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {            
            closeModal();
        } catch (error) {
            console.error("Error al enviar el formulario:", error.message);
        }
    };

    return (
        <div className="modal-container">
            <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <form onSubmit={handleSubmit}>
                {/* Contenido del modal */}
                <h2>Modal Title</h2>
                <p>Modal Content</p>
                <button onClick={closeModal} className="close-modal-button">Cerrar</button>
            </form>
            </div>
        </div>
    );
};

export default Modal;
