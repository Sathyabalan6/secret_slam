// src/components/Login.js
import React from 'react';
import login from '../assets/login-pls.png'
import google from '../assets/icons/icons8-google-48.png'
import { db } from '../util/config'
import firebase from 'firebase/app'
import 'firebase/auth'
import { toast } from 'react-toastify';

const Login = () => {
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
                                email: user.email,
                                photo: user.photoURL
                            }).then(() => {
                                toast('Login successfull!', {
                                    type: 'success'
                                })
                            })
                                .catch((e) => {
                                    console.log(e);
                                    toast('Something went wrong', { type: 'error' })
                                })
                        }
                    }).catch(e => {
                        console.log(e);
                        toast('Something went wrong', { type: 'error' })
                    })
                })
                    .catch(e => {
                        console.log(e);
                        toast('Something went wrong', { type: 'error' })
                    })


            })
            .catch((e) => {
                console.log(e);
                toast('Something went wrong', { type: 'error' })
            })
    }


    return (
        <div style={{}} className="container d-flex flex-column justify-content-center ">
            <div className='w-100 d-flex justify-content-center'>
                <button className='btn btn-lg font-weight-bold btn-outline-danger mx-auto' onClick={authWithGoogle}>
                    <img src={google} alt="" />
                Sign in with Google</button>
            </div>
            <div className="login-div mx-auto">
                <img src={login} alt="" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
            </div>
        </div>
    );

}

export default Login;