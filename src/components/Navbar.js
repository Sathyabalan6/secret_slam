// src/components/Navbar.js
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../css/Navbar.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import { SbContext } from '../context/Context';
import { toast } from 'react-toastify';

const Navbar = () => {
    const history = useHistory()
    const { state } = useContext(SbContext);
    const { currentUser } = state

    const logOut = (e) => {
        e.preventDefault()
        firebase.auth().signOut().then(() => {

            toast("Signed out successfully!!", {
                type: 'success'
            })
            history.push('/')
        })
    }

    return (


        <nav className="navbar navbar-expand-lg navbar-light my-2" style={{ backgroundColor: '#E84342 !important' }}>
            <a className="navbar-brand text-center" href='/'>Slambook</a>
            {
                currentUser ? (
                    <>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item px-3">
                                    <NavLink activeClassName='active' className='nav-link' to='/' exact >
                                        Home
                                </NavLink>
                                </li>
                                <li className="nav-item px-3">
                                    <NavLink activeClassName='active' className='nav-link' to='/create' exact >
                                        Create
                                </NavLink>
                                </li>



                                <li className="nav-item dropdown px-3">
                                    <a className="nav-link" href="/" onClick={logOut}>
                                        Logout
                                    </a>

                                </li>

                            </ul>

                        </div>
                    </>
                ) : (
                        <></>
                    )
            }
        </nav>

    );
}

export default Navbar;