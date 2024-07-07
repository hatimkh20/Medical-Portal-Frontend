import React from 'react';
import './Modal.css'; // Make sure the styles are correctly imported

const Modal = ({ isOpen, closeModal, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-button" onClick={closeModal}>×</button>
                {title && <h2>{title}</h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
