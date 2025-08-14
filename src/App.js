// src/App.js
import React, { useState, useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import CreateSlambook from './pages/CreateSlambook'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound'
import { SbContext } from './context/Context';
import Footer from './components/Footer';

import { SET_CURRENT_USER, SET_LOADING } from './context/action.types'
import reducer from './context/reducer';


//firebase stuff
import 'firebase/auth'
import { app } from './util/config';
import FillSlambook from './pages/FillSlambook';
import ViewSlambook from './pages/ViewSlambook';

const initialState = {
  currentUser: null,
  slambooks: [],
  my_slambooks: [],
  my_slambook: null,
  slambook: null,
  isLoading: true,
  isLoggedIn: false
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    app.auth().onAuthStateChanged(async (user) => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: user
      })

      dispatch({
        type: SET_LOADING,
        payload: false
      })
      setIsLoggedIn(true)
    })
  }, [])


  return (
    <SbContext.Provider value={{ state, dispatch }}>

      <ToastContainer />

      <div className="col-md-11 col-12 mx-auto" style={{ minHeight: '100vh' }}>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/create' exact component={CreateSlambook} />
            <Route path='/slam/view' exact component={ViewSlambook} />
            <Route path='/slambook/:slamid' exact component={FillSlambook} />
            <Route exact path="*" component={PageNotFound} />

          </Switch>
        </Router>
      </div>

      <Footer />


    </SbContext.Provider>


  );
}

export default App;
