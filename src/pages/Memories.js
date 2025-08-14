// src/pages/Memories.js
import React, { useState, useContext } from 'react';
import '../css/Memories.css'
import { motion } from 'framer-motion'
import { SbContext } from '../context/Context';
import Modal from '../components/Modal';
const Memories = () => {


    const { state } = useContext(SbContext)
    const { slambooks } = state
    const [selectedImg, setSelectedImg] = useState(null)

    return (
        <>
            {

                slambooks.length !== 0 ? (<div className="pt-3">
                    <div className="album">
                        {
                            slambooks.map((slam, index) => (
                                slam.data.memoryUrl && <motion.img key={index} src={slam.data.memoryUrl} alt="memory from slambook" className="photo shadow-box"
                                    onClick={() => setSelectedImg(slam.data.memoryUrl)}
                                    whileHover={{ opacity: 1 }}
                                />
                            ))
                        }
                    </div>
                </div>) :
                    (
                        <div className="container d-flex justify-content-center">
                            <h5 className='text-danger mt-5'>No Memories ! </h5>
                        </div>
                    )
            }

            {selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />}
        </>
    )
}

export default Memories;