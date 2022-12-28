//import react components
import { useState } from "react";

//import fireston util
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

//components
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

//scss
import './sign-in-form.scss';

const defaultFormFields = {
    email: '',
    password: '',
}


//Returned Component
const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
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
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className='sign-in-container'>
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

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password"
                    value={password}
                />
            <div className="buttons-container">
                <Button type='submit'>
                    SIGN IN!
                </Button>
                <Button
                    type="button" 
                    onClick={signInWithGoogle} 
                    buttonType='google'
                >
                    Google Sign In
                </Button>
            </div>
            

            </form>

        </div>
    )
}

export default SignInForm;