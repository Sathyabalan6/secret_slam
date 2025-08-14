// src/pages/ViewSlambook.js
import React, { useContext, Fragment } from 'react';
import { SbContext } from '../context/Context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import '../css/ViewSlambook.css'
import firebase from 'firebase/app'
import 'firebase/storage'
import { motion } from 'framer-motion'
//images
import backgrnd from '../assets/social_bg.jpg'
import buddies from '../assets/buddies.svg'
import smile from '../assets/icons/smile.png'
import goggles from '../assets/icons/goggles_smile.png'
import starface from '../assets/icons/star_smile.png'
import heart from '../assets/icons/heart.png'
import { db } from '../util/config';
import { SET_SINGLE_SB } from '../context/action.types';
import { toast } from 'react-toastify';


const ViewSlambook = () => {
    const { state, dispatch } = useContext(SbContext)
    const { slambook } = state

    const deleteSlam = () => {
        let resp = window.confirm('Are you sure you want to delete this response?')
        if (resp) {
            db.collection('responses').doc(slambook.id).delete()
                .then(() => {
                    if (slambook.data.memoryFileName) {
                        firebase.storage().ref()
                            .child(`memories/${slambook.data.memoryFileName}`)
                            .delete()
                            .then(() => toast('Slam Deleted!', { type: 'error' }))
                            .catch(() => {
                                toast('Some error occurred!', { type: 'error' })
                            })
                    }
                    dispatch({
                        type: SET_SINGLE_SB,
                        payload: null
                    })
                })
        }
    }

    console.log(slambook)
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            {
                slambook ? (

                    <Fragment>
                        <div className="container">
                            <div className="d-flex mt-3 flex-wrap align-items-center mb-2 p-1">
                                <img src={slambook.data.owner_data.avatar} alt="" className="img-thumbnail" style={{ width: '4rem', opacity: 0.7, height: '4rem', borderRadius: '2rem' }} />
                                <div className='p-2 flex-grow-1'>
                                    <h4>{slambook.data.owner_data.name}</h4>
                                </div>
                                <h5><span className="badge badge-danger" onClick={deleteSlam} style={{ cursor: 'pointer' }}>Delete Slam</span></h5>
                            </div>
                        </div>

                        <div className="container shadow-box mb-5" style={{ position: 'relative', borderRadius: '25px' }}>
                            <img src={backgrnd} alt="" className='bg-cont' />
                            <div className="row  d-flex">
                                <div className="col-md-7 offset-0 p-4 p-md-5 ">
                                    {slambook.data.answers.map((answer, index) => {
                                        return (
                                            <div key={index}>
                                                <label className='view_qustn'>{answer.qustn}</label>
                                                <p className='view_ans'>{answer.response}</p>
                                            </div>
                                        )
                                    })

                                    }
                                </div>
                                <div className="col-md-5 p-4 p-md-3 d-flex justify-content-center align-items-center ">
                                    <div className="card my-auto shadow-box" style={{ width: '90%' }}>
                                        {
                                            slambook.data.memoryUrl ? (
                                                <img src={slambook.data.memoryUrl} className="card-img-top" alt="..." style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            ) :
                                                (
                                                    <img src={buddies} className="card-img-top" alt="..." style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

                                                )
                                        }
                                        <div className="card-body">
                                            <img src={heart} alt="" />
                                            <img src={smile} alt="" />
                                            <img src={starface} alt="" />
                                            <img src={goggles} alt="" />
                                            <p className='photo-caption'>{slambook.data.caption}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Fragment>
                ) :
                    (
                        <Redirect to='/' />
                    )
            }
        </motion.div>);
}


export default ViewSlambook;