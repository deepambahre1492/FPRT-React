import React from 'react';
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import SuccessRegistered from './pages/SuccessRegistered/SuccessRegistered';
import ConfirmForgotPassword from './pages/ConfirmForgotPassword/Confirm';
import ChangePicture from './pages/ChangePicture/ChangePicture';
import ResetMyPassword from './pages/ResetMyPassword/ResetMyPassword';
import Profile from './pages/Profile/Profile';


import * as authActionCreators from './Redux/Actions/AuthActionCreators';

class App extends React.Component {


  async componentDidMount(){
  const res = await this.props.getUser();
  if (res.status === 'fail'){
    localStorage.removeItem('token');
  }

  }



  render(){
    
    return (
      <div className="App">

          <Header/>

          <Switch>

            <Route path="/" exact component={Home} />
            {/* <Route path='/' exact component={Home} /> */}
            <Route path='/landing' exact render={(props) => (!this.props.isAuthenticated ? <Landing {...props}/> : <Redirect to='/' />)} />
            <Route path="/auth/register" exact render={(props) => (!this.props.isAuthenticated ? <Register {...props}/> : <Redirect to="/" />)}/>
            <Route path="/auth/login" exact render={(props) => (!this.props.isAuthenticated ? <Login {...props}/> : <Redirect to="/" />)}/>
            <Route path="/auth/forgotPassword" exact component={ForgotPassword}/>
            <Route path="/auth/reset-Password/:token" exact component={ResetPassword}/>
            <Route path="/auth/confirmEmail" exact component={SuccessRegistered}/>
            <Route path="/auth/confirmForgotPassword" exact component={ConfirmForgotPassword}/>
            <Route path="/auth/resetMyPassword" exact render={(props) => this.props.isAuthenticated ? <ResetMyPassword {...props} /> : <Redirect to='/auth/login' />}/>
            <Route path="/auth/changePicture" exact render={(props) => this.props.isAuthenticated ? <ChangePicture {...props} /> : <Redirect to='/auth/login' />}/>
            <Route path="/auth/profile" exact render={(props) => this.props.isAuthenticated ? <Profile {...props} /> : <Redirect to='/auth/login' />}/>


            <Route render={() => <Redirect to='/' />} />

          </Switch>

          


      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(authActionCreators.getUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
