// src/pages/AllSlams.js
import React, { useContext, useState, useEffect } from 'react';
import { db } from '../util/config'
import empty from '../assets/empty.svg'

import SlamCard from '../components/SlamCard';
import { SbContext } from '../context/Context';
import { SET_MY_SLAMBOOKS, SET_SLAMBOOKS } from '../context/action.types';
import MySlamCard from '../components/MySlamCard';
import Memories from './Memories';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
const AllSlams = () => {
    const { state, dispatch } = useContext(SbContext)
    const { currentUser, slambooks, my_slambooks } = state
    const [isLoading, setIsLoading] = useState(true)
    const [responses, setResponses] = useState([])

    const [visible, setVisible] = useState(8)

    const loadMore = () => {
        if ((visible + 6) <= slambooks.length)
            setVisible(visible + 6)
        else
            setVisible(slambooks.length)
    }


    const responsesRef = db.collection('responses')
    const slambookRef = db.collection('slambooks')
    const getAllSlams = async () => {
        if (currentUser) {
            await responsesRef.where('slam_owner_id', '==', currentUser.uid).orderBy('createdAt', 'desc').get()
                .then(function (querySnapshot) {
                    const responses = []

                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        responses.push({ data: doc.data(), id: doc.id })
                    });
                    dispatch({
                        type: SET_SLAMBOOKS,
                        payload: responses
                    })
                    setResponses(responses)
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
    }

    const getMySlambooks = async () => {
        await slambookRef.where('owner', '==', currentUser.uid).get()
            .then(function (querySnapshot) {
                const myslams = []
                querySnapshot.forEach(function (doc) {
                    myslams.push({ data: doc.data(), id: doc.id })
                })
                dispatch({
                    type: SET_MY_SLAMBOOKS,
                    payload: myslams
                })

            })
            .catch((e) => {
                console.log(e);
                toast('Some error occurred', { type: 'error' })
            })
    }




    const getTitle = (id) => {
        let title
        my_slambooks.forEach(slam => {
            if (slam.id === id) {
                title = slam.data.title
            }
        })
        return title
    }

    useEffect(() => {
        getAllSlams()
        getMySlambooks().then(() => {
            setIsLoading(false)
        })
    }, [])



    if (isLoading) {
        return (
            <div className='container d-flex justify-content-center align-items-center' style={{ height: '40vh' }}>
                <div className="spinner-grow text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            <div className="d-flex flex-wrap align-items-center p-1 mb-5">
                <img src={currentUser.photoURL} alt="" className="img-thumbnail" style={{ width: '5rem', height: '5rem', borderRadius: '2.5rem' }} />
                <div className='p-2'>
                    <h3>{currentUser.displayName}</h3>
                </div>
                <div className='mx-md-3 mx-auto'>
                    <h6>Responses <span className="badge badge-danger">{slambooks.length}</span></h6>
                </div>
                <div className='mx-md-3 mx-auto'>
                    <h6>My Slambooks <span className="badge badge-danger">{my_slambooks.length}</span></h6>
                </div>
                <div></div>
            </div>
            <div className="container p-md-2 p-0">

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link tab-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Slams</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">My Slams</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="memories-tab" data-toggle="tab" href="#memories" role="tab" aria-controls="memories" aria-selected="false">Photos</a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className='pt-3' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                            {
                                slambooks.length !== 0 ? (
                                    slambooks.slice(0, visible).map((resp, index) => {
                                        const title = getTitle(resp.data.slamId)
                                        return (

                                            <SlamCard key={index} index={index % 4} slam={resp} title={title} />
                                        )
                                    })
                                ) : (
                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                            <h5 className='text-danger'>You dont have any slams!!!!</h5>
                                            <p className='text-secondary'>Share your slambooks with your friends or create new slambook.</p>
                                            <img src={empty} alt="empty-slambook" style={{ height: '20rem', width: '100%', objectFit: 'contain' }} />

                                        </div>
                                    )
                            }

                        </div>
                        {
                            slambooks.length > visible && (

                                <div>
                                    <button className="btn btn-outline-danger float-right" onClick={loadMore}>Load More</button>
                                </div>
                            )
                        }
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="container  p-4">

                            <MySlamCard />

                        </div>
                    </div>
                    <div className="tab-pane fade" id="memories" role="tabpanel" aria-labelledby="memories-tab">

                        <Memories />


                    </div>
                </div>



            </div>
        </motion.div>
    );
}

export default AllSlams;