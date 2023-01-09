//import react components
import { useState} from "react";

//import fireston util
import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

//components
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

//Styles
import { SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
    email: '',
    password: '',
}

//Returned Component
const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password} = formFields;
    const [ passwordType, setPasswordType ] = useState('password');
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(
                email, 
                password,
            );
            resetFormFields();
        } catch (error){
            switch (error.code) {
                case 'auth/wrong-password':
                  alert('incorrect password for email');
                  break;
                case 'auth/user-not-found':
                  alert('no user associated with this email');
                  break;
                default:
                  console.log(error);
              }
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value })
    }

    const signInWithGoogle = async () => {
        signInWithGooglePopup();
    };

    const showPassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
    }

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email"
                    value={email}
                />
                <div className="password-container">
                <FormInput 
                    label="Password"
                    type={passwordType}
                    required 
                    onChange={handleChange} 
                    name="password"
                    value={password}
                />
                <input className="show-password" 
                       type="checkbox" 
                       onClick={showPassword}
                />
                </div>
               
                <div className="buttons-container" onClick={showPassword}>
                    <Button type='submit'>
                        SIGN IN!
                    </Button>
                    <Button
                        type="button" 
                        onClick={signInWithGoogle} 
                        buttonType={BUTTON_TYPE_CLASSES.google}
                    >
                        Google Sign In
                     </Button>
                </div>
            </form>

        </SignInContainer>
    )
}

export default SignInForm;