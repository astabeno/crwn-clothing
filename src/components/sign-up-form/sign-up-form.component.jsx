import { useState } from "react";

import { createAuthUserWithEmailAndPassword,
        createUserDocumentFromAuth,
 } from '../../utils/firebase/firebase.utils';

 import FormInput from "../form-input/form-input.component";
 import Button from "../button/button.component";

 import './sign-up-form.styles.scss';

 

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    //console.log(formFields)
    const resetFields = ()=>{
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //if confirmPassword doesn't match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        //continue if password match and create new user
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            //console.log(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetFields();
        }catch (error) {
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already Registered')
            }else{
                console.log('error creating user', error);
            }
            
        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't Have an Account</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password"
                    value={password}
                />
                
                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type='submit'>SIGN UP!</Button>

            </form>
        </div>
    )
}

export default SignUpForm;