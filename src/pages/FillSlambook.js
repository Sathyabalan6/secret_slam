// src/pages/FillSlambook.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { SbContext } from '../context/Context';
import { readAndCompressImage } from 'browser-image-resizer'
import { motion } from 'framer-motion'
//images
import friendImg from '../assets/true_love.svg'
import twoFingers from '../assets/icons/two-fingers.png'
import smile from '../assets/icons/smile.png'
import done from '../assets/done.png'

import firebase from 'firebase/app'
import 'firebase/auth'
import { db, app, imageConfig } from '../util/config';
import '../css/FillSlambook.css'
import Login from '../components/Login';
import { toast } from 'react-toastify';

const FillSlambook = () => {
    let params = useParams()
    const { state } = useContext(SbContext)
    const { currentUser } = state
    //this is used set data(questions) of slambook
    const [data, setData] = useState({})
    // const [currentUser, setCurrentUser] = useState()

    //Userdata is data of person who is owner of this salmbook
    const [userdata, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const { questions } = data
    const [logged, setLogged] = useState(false)
    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [noSlambook, setNoSlambook] = useState(false)
    const [slamFilled, setSlamFilled] = useState(false)
    const [responseId, setResponseId] = useState()
    const [isUploading, setIsUploading] = useState(false)
    const [downloadUrl, setDownloadUrl] = useState()
    const [imagePickerDisabled, setImagePickerDisabled] = useState(false)
    const slambookRef = db.collection('slambooks').doc(params.slamid)
    let dummy = [{ caption: '' }];


    useEffect(() => {

        app.auth().onAuthStateChanged(user => {
            if (user) {

                setLogged(true)
                setIsLoading(true)
            }
            else {
                setLogged(false)
                setIsLoading(false)
            }
        }
        )


    }, [])

    useEffect(() => {
        if (currentUser) {
            getSlambook()
        }
    }, [currentUser])



    // To upload image to firebase and then set the the image link in the state of the app
    const imagePicker = async e => {
        if (slamFilled && responseId) {
            setIsUploading(true)
            try {
                const file = e.target.files[0]
                var metadata = {
                    contentType: file.type
                }
                let resizedImage = await readAndCompressImage(file, imageConfig)
                const storageRef = await firebase.storage().ref()

                var uploadTask = storageRef
                    .child('memories/' + file.name)
                    .put(resizedImage, metadata)

                uploadTask.on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {

                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED:
                                setIsUploading(false)
                                console.log('Upload is paused')
                                break;
                            case firebase.storage.TaskState.RUNNING:
                                console.log('Uploading is in progress...')
                                break;
                            default:
                                break;
                        }
                        if (progress === 100) {
                            setIsUploading(false)
                            setImagePickerDisabled(true)

                            toast('Uploaded!', { type: 'success' })
                        }
                    },
                    error => {

                        toast('Something went wrong!', { type: 'error' })

                    },
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                            .then(downloadUrl => {
                                setDownloadUrl(downloadUrl)
                                db.collection('responses').doc(responseId).set({
                                    memoryUrl: downloadUrl,
                                    memoryFileName: file.name
                                }, { merge: true })
                            })
                            .catch(er => toast('Some error occurred.', { type: 'error' }))
                    }
                )
            }
            catch (e) { console.log(e) }

        }
        else {

            toast('Please fill slambook first!', { type: 'error' })
        }
    }


    const getSlambook = async () => {

        await slambookRef.get().then(function (doc) {
            if (doc.exists) {
                setData(doc.data())
                db.collection('responses').where('slamId', '==', params.slamid).where('owner', '==', currentUser.uid).get()
                    .then(
                        function (querySnapshot) {
                            console.log(querySnapshot)
                            if (querySnapshot.docs.length !== 0) {
                                setIsLoading(false)
                                setAlreadySubmitted(true)
                            }
                            else {
                                db.collection('users').doc(doc.data().owner).get().then(function (doc) {
                                    if (doc.exists) {

                                        console.log('went here')
                                        setIsLoading(false)

                                        setUserData(doc.data())
                                    }


                                }).catch(error => alert(error))

                            }
                        })
                    .catch(e => console.log('Getting slambook owner failed'))

            } else {

                setIsLoading(false)
                setNoSlambook(true)
            }
        }).catch(function (error) {
            toast("Some error occurred!", { type: 'error' });
        });

    }

    const handleChange = (e) => {
        console.log(e.target.className)
        if (e.target.className.split(' ').includes('question')) {


            dummy[parseInt(e.target.dataset.id) + 1]['response'] = e.target.value

        }
        if (e.target.className.split(' ').includes('caption')) {
            dummy[0]['caption'] = e.target.value
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        db.collection('responses').add({
            slam_owner_id: data.owner,
            slamId: params.slamid,
            owner: currentUser.uid,
            owner_data: {
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            },
            caption: dummy[0].caption,
            answers: dummy.splice(1),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()

        })
            .then((docRef) => {

                toast('Response sent!', { type: 'success' })
                setResponseId(docRef.id)
                setSlamFilled(true)
            })
            .catch((e) => {
                console.log(e)
                toast('Some error occurred', { type: 'error' })
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
    if (!logged) {
        return <Login />
    }


    if (alreadySubmitted) {
        return (
            <div className="container d-flex justify-content-center text-center align-items-center flex-column">
                <h3 className="text-danger">You have already submitted!</h3>
                <div>
                    <img src={done} alt="" style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />

                </div>
            </div>
        )
    }

    if (noSlambook) {
        return (
            <div className="container text-center">
                <h4 className="text-danger">No slambook found!!</h4>
                <p className='text-secondary'>Maybe the url is incorrect or the owner might have deleted this slambook.</p>
            </div>
        )
    }



    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            {
                logged ? (

                    <div className="container mb-5">
                        <p>From: {userdata && userdata.name} </p>
                        <form action="" onSubmit={handleSubmit} onChange={handleChange}>
                            <div className="row fillsb_container d-flex">
                                <div className="col-md-7 order-2 p-4 p-md-5 order-md-1">


                                    {
                                        questions && questions.map((question, index) => {
                                            dummy.push({ qustn: question.question, response: '' })

                                            return (
                                                <div className="form-group" key={index}>
                                                    <label className='question_label' htmlFor="">{question.question}</label>
                                                    <input className="form-control question" type="text" name='question' data-id={index} id={question.id} placeholder='Your response' readOnly={slamFilled} required />
                                                </div>
                                            )
                                        })


                                    }
                                    <div className="form-group mt-5">
                                        <label className='question_label' >Caption Me <img src={smile} alt="" /></label>
                                        <p className='text-secondary'>Write something awesome for me!</p>
                                        <input type="text" className="caption form-control" placeholder='Your response (max 40 characters)' readOnly={slamFilled} maxLength='40' />

                                    </div>

                                    <button className='btn btn-danger w-100 w-md-auto' type="submit" disabled={slamFilled}>
                                        Submit
                                    <img src={twoFingers} alt='emoji' style={{ color: 'white' }} />
                                    </button>



                                </div>
                                <div className="col-md-5 py-3 light-bg-col d-flex flex-column justify-content-center align-items-center order-1 order-md-2">
                                    <div className='text-center'>
                                        <p className="hello-frnd">Hello ma friend !!!</p>
                                        <img src={friendImg} alt="" style={{ width: '70%', height: '70%' }} />
                                    </div>
                                </div>
                            </div>

                        </form>
                        <div className="row mt-5 fillsb_container d-flex flex-wrap p-4 p-md-5">
                            <div className="form-group">
                                <label className='question_label'>Our Memories</label>
                                <p className='text-secondary'>Upload one best picture of us.</p>
                                <input type="file" accept='image/*' multiple={false} onChange={e => imagePicker(e)} className="form-control-file memories" disabled={imagePickerDisabled} />
                            </div>
                            {
                                isUploading ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="spinner-border text-danger mt-3" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>


                                ) : (

                                        downloadUrl && <img src={downloadUrl} className='img-thumbnail' alt="" />
                                    )
                            }
                        </div>

                    </div>
                ) : (
                        <Login />
                    )
            }
        </motion.div>
    );
}

export default FillSlambook;