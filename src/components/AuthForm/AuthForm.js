import { useState } from 'react';
import './AuthForm.style.scss';

function AuthForm ({onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailInputChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordInputChange = (e) => {
        setPassword(e.target.value)
    } 

    const onFormSubmit = (e) => {
        e.preventDefault()
        onLogin(
            email,
            password
        )
        setEmail('')
        setPassword('')
    }

    return (
        <form 
            className='AuthForm'
            onSubmit={onFormSubmit}
        >
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
        </form>
    )
}

export default AuthForm;