import { useState } from 'react'

const LoginForm = ({handleLogin}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()

        handleLogin({
            username,
            password
        })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={login} className='login-form'>
            <div>
                username
                <input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <br />
                <button type='submit' id='login-button'>Log In</button>
            </div>
        </form>
    )
}

export default LoginForm