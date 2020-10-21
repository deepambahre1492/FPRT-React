import React, { Component } from 'react'
import FormBuilder from '../FormBuilder/Form';
import styles from './Home.module.css';

class Home extends Component {
    render() {
        return (
            <div className={styles.home}>
                <FormBuilder />
            </div>
        )
    }
}

export default Home