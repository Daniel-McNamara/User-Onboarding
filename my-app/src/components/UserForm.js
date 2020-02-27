import React, { useState} from 'react';
import { withFormik, Form, Field } from 'formik';

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([

    ]);

    return (
        <div className='user-form'>
            <Form>
                <label htmlFor='name'>
                    Name:
                    <Field id='name' type='text' name='name' placeholder='Name' />                    
                </label>
                <label htmlFor='email'>
                    Email:
                    <Field id='email' type='text' name='email' placeholder='Email' />                    
                </label>
                <label htmlFor='password'>
                    Password:
                    <Field id='password' type='text' name='password' placeholder='Password' />                    
                </label>
                <label className='checkbox-container'>
                    Terms of Service
                    <Field type='checkbox' name='terms' checked={values.terms} />
                </label>
            </Form>            
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || '',
            email: props.email || '',
            password: props.password || '',
            terms: props.terms || false,            
        }
    }
})(UserForm);

export default FormikUserForm; 