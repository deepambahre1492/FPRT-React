
import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';  
import * as authActionCreators from '../../Redux/Actions/AuthActionCreators';
import styles from './Profile.module.css';

class Profile extends Component {

    handleLinkClick = (url) => {
        this.props.history.push(url);
        this.props.toggleSidebar();
    }

    handleLogout = () => {
        this.props.logout();
        this.props.toggleSidebar();
        this.props.history.push('/login');
    }

    render() {
        return this.props.user ? 
        (
            <div className={styles.profile}>
<Container fluid>
<Row className={styles.rowJustifyCenter}>
<Col md={{ span: 8, offset: 2 }}>
<div className={styles.personDetails}>
<Row>
<Col md={4}>
  
   <div className={styles.personImg}>
    {this.props.user && this.props.user.profilePic &&
        <img className={styles.profilePic} src={`${this.props.user.profilePic}`} alt=""/>
    }
    <Row className={styles.rowJustifyCenter}>
        <Col>
            <div className={styles.changeContainer}>                       
                        <Link className={styles.ChangeProfilefont} to={`/resetMyPassword`}><i className="fa fa-key" aria-hidden="true"></i></Link>
                      
                        <Link className={styles.ChangeProfilefont} to={`/changePicture`}><i className="fa fa-upload" aria-hidden="true"></i></Link>
            </div> 
        </Col>
    </Row>
    </div>
   </Col>
   <Col md={8}>
       <div className={styles.profileDetails}>
       <p><b>Username:</b> {this.props.user.username}</p>
       <p><b>Email:</b> {this.props.user.email}</p>
       </div>
     
   </Col>
  </Row>


</div>
</Col>
</Row>
</Container> 
            </div>
        )
        :

        <h1 className={styles.loading}>Loading...</h1>
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authActionCreators.logout()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));