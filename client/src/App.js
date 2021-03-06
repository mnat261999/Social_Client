import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Login from './pages/Login';
import Home from './pages/Home';
import Alert from './components/arlet/Alert';
import Register from './pages/Register';
import ActivationEmail from './pages/ActivationEmail';
import Header from './components/header/Header';
import Profile from './pages/Profile';
import StatusModal from './components/home/StatusModal';
/* import { getAvaByUser } from './redux/actions/avatarAction' */
import ForgotPass from './pages/ForgotPass';
import ResetPass from './pages/ResetPass';
import { getUserInfor } from './redux/actions/authAction'
import { DataProvider, GlobalState } from './GlobalState';


function App() {
  const state = useContext(GlobalState)
  const { auth, status, profile } = useSelector(state => state)


  //console.log({status})

  const dispatch = useDispatch()


  useEffect(() => {
    if (auth.token) {
      dispatch(getUserInfor(auth.token))
      /*       dispatch(getAvaByUser(auth.token)) */
    }
  }, [auth.token, dispatch])
  return (
    <DataProvider>
      <Router>
        <Alert />
        <input type="checkbox" id="theme" />
        <div className='App'>
          <div className="main">
            {auth.token && <Header />}
            {status && <StatusModal />}
            <Route exact path="/" component={auth.token ? Home : Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/user/activate/:activation_token" exact component={ActivationEmail} />
            <Route path="/profile/:id" exact component={Profile} />
            <Route path="/forgot_password" exact component={ForgotPass} />
            <Route path="/user/reset/:token" exact component={ResetPass} />
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
