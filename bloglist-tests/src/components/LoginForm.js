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
        <form onSubmit={login}>
            <div>
                username
                <input
                    type='text'
                    name='username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type='password'
                    name='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                <br />
                <button type='submit'>Log In</button>
            </div>
        </form>
    )
}

export default LoginForm