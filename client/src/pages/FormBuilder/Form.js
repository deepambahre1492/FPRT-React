import React, { Component } from 'react';
import { FormBuilder } from "cb-react-forms";

import './form.css';

class FormData extends Component {
  render() {
    return (
      <div className="FormBuilder">
        <FormBuilder onSubmit={data => console.log(data)} />
      </div>
    );
}
}


export default FormData
