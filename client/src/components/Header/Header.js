
import React, { Component } from 'react';

import styles from './Header.module.css';

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import logo from '../../logo.png';

import '@animated-burgers/burger-rotate/dist/styles.css' 
import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';

class Header extends Component {
    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
    
        return (
            <div className={styles.header}>

                <Link to="/" className={styles.logo}><img className={styles.logoImg} src={logo} alt={logo}/>React FormBuilder</Link>

                <div className={styles.nav}>
                    {!this.props.isAuthenticated ? 
                        <>
                            <Link to="/login" className={styles.btn}>Login</Link>
                            <Link to="/register" className={styles.btn}>Register</Link>
                        </>
                        :
                        <>  
                            <Link to="/dashboard" className={styles.btn}>Dashboard</Link>
                            <Link to="/profile" className={styles.btn}>Profile</Link>
                            <Link to="/login" className={styles.btn} onClick={() => this.handleLogout()}>Logout</Link>
                        </>
                        
                    }
    
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));