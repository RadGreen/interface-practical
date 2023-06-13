import { useState } from 'react';
import './AuthForm.style.scss';

const FORM_KEYS = {
    login: 'login',
    registration: 'registration'
}

function AuthForm ({onLogin, onRegister}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [currentForm, setCurrentForm] = useState(FORM_KEYS.login);

    const onEmailInputChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordInputChange = (e) => {
        setPassword(e.target.value)
    }

    const onRepeatPasswordInputChange = (e) => {
        setRepeatPassword(e.target.value)
    }

    const onRegisterButtonClick = () => {
        setCurrentForm(FORM_KEYS.registration)
    }

    const onLoginButtonClick = () => [
        setCurrentForm(FORM_KEYS.login)
    ]

    const onFormSubmit = (e) => {
        e.preventDefault()

        if(currentForm === FORM_KEYS.login) {
            onLogin(
                email,
                password
            )
        } else if (currentForm === FORM_KEYS.registration) {
            if(password === repeatPassword) {
                onRegister(email, password)
            } else {
                alert('Password does not match')
            }
        }

        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }

    const renderRegistrationForm = () => {
        return (
            <>
                <button 
                    className='AuthForm-SwitchButton' 
                    type='button'
                    onClick={onLoginButtonClick}
                >
                    Go to Login
                </button>
                <label>
                    Email
                    <input 
                        onChange={ onEmailInputChange } 
                        value={email}
                        type='text'
                    />
                </label>
                <label>
                    Password
                    <input 
                        onChange={ onPasswordInputChange } 
                        value={password}
                        type='password'
                    />
                </label>
                <label>
                    Repeat Password
                    <input 
                        onChange={ onRepeatPasswordInputChange } 
                        value={repeatPassword}
                        type='password'
                    />
                </label>
                <button type='submit'>Register</button>
            </>
        )
    }

    const renderLoginForm = () => {
        return (
            <>
                <button 
                    className='AuthForm-SwitchButton' 
                    type='button'
                    onClick={onRegisterButtonClick}
                >
                   Go to Register
                </button>
                <label>
                    Email
                    <input 
                        onChange={ onEmailInputChange } 
                        value={email}
                        type='text'
                    />
                </label>
                <label>
                    Password
                    <input 
                        onChange={ onPasswordInputChange } 
                        value={password}
                        type='password'
                    />
                </label>
                <button type='submit'>Login</button>
            </>
        )
    }

    return (
        <form 
            className='AuthForm'
            onSubmit={onFormSubmit}
        >
            { currentForm === FORM_KEYS.login && renderLoginForm() }
            { currentForm === FORM_KEYS.registration && renderRegistrationForm() }
        </form>
    )
}

export default AuthForm;