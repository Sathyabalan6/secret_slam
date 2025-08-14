// src/components/Modal.js
import React from 'react';
import { motion } from 'framer-motion';
const Modal = ({ selectedImg, setSelectedImg }) => {
    return (
        <motion.div className="backdrop" onClick={() => setSelectedImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img src={selectedImg} alt="enlarged photo" initial={{ y: '-100vh' }} animate={{ y: 0 }} />
        </motion.div>
    );
}

export default Modal;
