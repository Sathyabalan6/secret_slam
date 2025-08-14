//CreateSlambook.js
import React, { useState, useContext, useEffect } from 'react';
import { TiDelete } from 'react-icons/ti'
import { motion } from 'framer-motion'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdContentCopy } from 'react-icons/md'
import { db, app } from '../util/config';
import { v4 } from 'uuid'
import flower from '../assets/elements.svg'
import '../css/CreateSlambook.css'
import { SbContext } from '../context/Context';
import Login from '../components/Login';
import { SET_LOADING } from '../context/action.types';
import { toast } from 'react-toastify';
import { slambook_questions } from '../helper'
const CreateSlambook = () => {

    const URL = process.env.REACT_APP_URL

    const options = slambook_questions
    const { state, dispatch } = useContext(SbContext);
    const { currentUser, isLoading } = state;
    const [question, setQuestion] = useState()
    const [questions, setQuestions] = useState([]);
    const [opt_question, setOptQuestion] = useState();
    const [title, setTitle] = useState('')
    const [logged, setLogged] = useState(false)
    const [url, setUrl] = useState()


    useEffect(() => {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                setLogged(true)
                dispatch({
                    type: SET_LOADING,
                    payload: false
                })
            }
            else {
                setLogged(false)
            }
        }
        )
    }, [])

    const addQuestionToArray = (e) => {
        e.preventDefault()
        if (e.target.name === 'optionsbtn') {
            if (opt_question) {
                setQuestions([...questions, {
                    id: v4(),
                    question: opt_question
                }])
            }
        }
        if (e.target.name === 'custombtn' && question !== '' && question !== undefined) {
            setQuestions([...questions, {
                id: v4(),
                question
            }])
            setQuestion('')

        }
        console.log(questions)

    }

    const handleSelectChange = (e) => {
        console.log(e)
        setOptQuestion(e)
    }

    const createSlambook = (e) => {
        e.preventDefault()
        if (title) {
            if (questions.length !== 0) {
                db.collection('slambooks').add({
                    owner: currentUser.uid,
                    title,
                    questions,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                    .then(function (docRef) {
                        toast('Slambook created! Copy url shown above to share slambook', {
                            type: 'success'
                        })
                        setUrl(`${URL}slambook/${docRef.id}`)
                        setQuestions([])
                        setTitle(null)
                    })
                    .catch(() => toast('Some error occurred!', {
                        type: 'error'
                    }))
            }
            else {
                toast('Add atleast one question.', { type: 'error' })
            }
        }
        else {
            toast('Slambook should have title!', { type: 'error' })
        }

    }
    const deleteQuestion = (id) => {
        setQuestions(questions.filter((qustn) => qustn.id !== id))
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

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >

            {
                logged ? (
                    <div className="container mb-5">
                        <div className="row">
                            <div className="col-md-9 col-12 mx-auto create-form py-3">
                                <h3 className='mx-auto text-center w-100'>Create New Slambook</h3>
                                {
                                    url && (

                                        <div className="text-center mt-5">
                                            <h5>Copy this URL and share with your friends</h5>
                                            <CopyToClipboard text={url}
                                                onCopy={() => toast('URL Copied', { type: 'success' })}
                                            >
                                                <p className='slam_url'>Click icon to copy URL.
                                                    <MdContentCopy size={25} className='text-danger ml-2' style={{ cursor: 'pointer' }} />
                                                </p>
                                            </CopyToClipboard>

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row d-flex create-row">
                            <div className="col-md-8 p-md-5 p-4  order-md-1 order-2">
                                <form>
                                    <div className="form-group">
                                        <label className=' form-label' >Give Title to your Slambook</label>
                                        <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="ex. BFF's" required />
                                    </div>
                                    <div className="form-group">
                                        <p className=' form-label' >Most used questions</p>
                                        <p className="text-secondary">You can choose from commonly used questions.</p>

                                        <div class="btn-group">
                                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Choose question.<span class="caret"></span></button>
                                            <ul class="dropdown-menu scrollable-menu" role="menu">

                                                {
                                                    options.map((option, index) => (

                                                        <li key={index} onClick={() => handleSelectChange(option)}><a href='#' className='dropdown-item'>{option}</a></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>


                                        <p className="text-danger">{opt_question}</p>
                                        <div className='d-flex justify-content-end'>
                                            <button name='optionsbtn' type="submit" className="btn btn-outline-danger mx-2" onClick={addQuestionToArray} >Add</button><br />
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label className=' form-label' >Custom Question.</label>
                                        <p className='text-secondary'>You can also add your own questions, click Add to add one more question and click Done to submit questions.</p>
                                        <textarea value={question} type="text" rows='3' className="form-control" onChange={(e) => setQuestion(e.target.value)} placeholder='Enter your question' required />

                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button name='custombtn' type="submit" className="btn btn-outline-danger mx-2" onClick={addQuestionToArray} >Add</button><br />
                                    </div>
                                    <button type="submit" className="btn btn-danger w-100 mt-3" onClick={createSlambook}  >Create slambook</button>
                                </form>

                                {
                                    questions.map(ques => (
                                        <div className='d-flex'>
                                            <p className='questions' key={ques.id}>{ques.question}</p>
                                            <TiDelete size={25} className='text-danger mx-2 mt-2'
                                                onClick={() => deleteQuestion(ques.id)}
                                                style={{ cursor: 'pointer' }} />
                                        </div>
                                    ))
                                }

                            </div>
                            <div className="col-md-4 form-div d-flex flex-column justify-content-center align-items-center p-2 order-md-2 order-1">
                                <img src={flower} className='flower_img' alt="" />
                            </div>

                        </div>




                    </div>


                ) : (<Login />)
            }
        </motion.div>
    );
}

export default CreateSlambook;