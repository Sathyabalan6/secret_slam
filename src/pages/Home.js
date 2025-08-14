// src/pages/Home.js
import React, { useContext } from 'react';
import bookImg from '../assets/book.svg'
import firebase from 'firebase/app'
import 'firebase/auth'
import google from '../assets/icons/icons8-google-48.png'
import { db } from '../util/config'

import '../css/Home.css'
import { SbContext } from '../context/Context';
import AllSlams from './AllSlams';
import { toast } from 'react-toastify';
const Home = () => {
    const user = firebase.auth().currentUser
    const { state } = useContext(SbContext)
    const { isLoading } = state

    var provider = new firebase.auth.GoogleAuthProvider();
    const authWithGoogle = () => {
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user
                const docref = db.collection('users').doc(user.uid)

                db.runTransaction(transaction => {
                    return transaction.get(docref).then((doc) => {
                        if (!doc.exists) {
                            db.collection('users').doc(user.uid).set({
                                name: user.displayName,
                                email: user.email
                            }).then(() => {
                                toast('Login successfull!', {
                                    type: 'success'
                                })
                            })
                                .catch((e) => {
                                    console.log(e)
                                    toast('Some error occured!', {
                                        type: 'error'
                                    })
                                })
                        }
                    }).catch(e => {
                        console.log(e)
                        toast('Some error occured!', {
                            type: 'error'
                        })
                    })
                })
                    .catch(e => {
                        console.log(e)
                        toast('Some error occured!', {
                            type: 'error'
                        })
                    })


            })
            .catch((e) => {
                console.log(e)
                toast('Some error occured!', {
                    type: 'error'
                })
            })
    }

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
        <>
            <div className="container-fluid">
                {
                    user ? (

                        <AllSlams />


                    ) : (
                            <div className="row">
                                <div className="col-md-6 d-flex text-center text-md-left flex-column justify-content-center mainpage_header">
                                    <h1>Bring up old memories of slambook.</h1>

                                    <p>Invite your school, college, old, new...all friends to fill slambook for you. </p>
                                    <div>
                                        <button className='btn btn-lg font-weight-bold btn-outline-danger mx-auto' onClick={authWithGoogle}>
                                            <img src={google} alt="" />
                                    Sign in with Google</button>
                                    </div>

                                </div>
                                <div className="col-md-6 d-flex flex-column justify-content-center">
                                    <img src={bookImg} className='img ml-md-auto mainpage_img' alt="" />
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    );
}

export default Home;