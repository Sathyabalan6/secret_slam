// src/components/MySlamCard.js
import React, { useContext, useState, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdContentCopy } from 'react-icons/md'
import { motion } from 'framer-motion'
import { SbContext } from '../context/Context';
import empty from '../assets/empty.svg'

import { db } from '../util/config';
import { SET_SINGLE_MY_SB, SET_MY_SLAMBOOKS } from '../context/action.types';
import { toast } from 'react-toastify';
const MySlamCard = () => {

    const URL = process.env.REACT_APP_URL

    const { state, dispatch } = useContext(SbContext)
    const { my_slambook, my_slambooks } = state
    const [mySlamsArray, setMySlamsArray] = useState(my_slambooks)

    ////for my slambooks list colors
    const colors = ['#fe9d9b', '#fee290', '#9fa1ff', '#a0fcd2']
    const textColor = ['#D63031', '#fd912c', '#3C40C6', '#218F76']


    const deleteMySlam = () => {
        let resp = window.confirm('Are you sure you want to delete this slambook?')
        if (resp) {
            db.collection('slambooks').doc(my_slambook.id).delete()
                .then(() => {
                    setMySlamsArray(mySlamsArray.filter(slam => slam.id !== my_slambook.id))
                    dispatch({
                        type: SET_MY_SLAMBOOKS,
                        payload: my_slambooks.filter(slam => slam.id !== my_slambook.id)
                    })
                    dispatch({
                        type: SET_SINGLE_MY_SB,
                        payload: null
                    })

                })
                .catch((e) => {
                    console.log(e);
                    toast('some error occurred', { type: 'error' })
                })
        }
    }




    return (
        <Fragment>
            <div className="row d-flex justify-content-center align-items-center">
                <ul className="list-group d-flex flex-wrap list-group-horizontal">
                    {
                        mySlamsArray && mySlamsArray.length !== 0 ? (
                            mySlamsArray.map((myslam, index) => (

                                <li key={index} className="list-group-item font-weight-bold"
                                    onClick={() => dispatch({ type: SET_SINGLE_MY_SB, payload: myslam })}
                                    style={{ backgroundColor: colors[index % 4], color: textColor[index % 4], cursor: 'pointer' }}>{myslam && myslam.data.title}</li>

                            ))
                        ) : (
                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                    <h5 className='text-danger'>You dont have any slambooks!!!!</h5>
                                    <p className='text-secondary'>Create a new slambook and share with your friends.</p>
                                    <img src={empty} alt="empty-slambook" style={{ height: '20rem', width: '100%', objectFit: 'contain' }} />

                                </div>
                            )
                    }
                </ul>
            </div>
            <div className="row">
                {
                    my_slambook && (
                        <motion.div className="container shadow-box mt-4 p-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div>
                                <h5><span className="badge badge-danger" onClick={deleteMySlam} style={{ cursor: 'pointer' }}>Delete Slam</span></h5>
                            </div>
                            <div className="py-2 d-flex flex-column align-items-center justify-content-center">
                                <p>Copy this URL to share this slambook.</p>

                                <CopyToClipboard text={`${URL}slambook/${my_slambook.id}`}
                                    onCopy={() => toast('URL Copied', { type: 'success' })}
                                >
                                    <p className='slam_url'>Click icon to copy URL
                                        <MdContentCopy size={25} className='text-danger ml-2' style={{ cursor: 'pointer' }} />
                                    </p>
                                </CopyToClipboard>
                            </div>
                            {
                                my_slambook.data.questions.map((qustn, index) => (
                                    <h5 key={index} className='view_qustn'>{qustn.question}</h5>
                                ))
                            }
                        </motion.div>
                    )
                }

            </div>


        </Fragment>
    )


}

export default MySlamCard;