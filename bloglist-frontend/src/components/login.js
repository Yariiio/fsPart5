import React from "react";

const LoginForm = ({handleLogIn, username, password, handleUsername, handlePassword}) => {
    return (
        <div>
          <form onSubmit={handleLogIn}>
            username<input type='text' name='username' value={username} onChange={handleUsername} /><br />
            password<input type='password' name='password' value={password} onChange={handlePassword} /><br />
            <button type='submit'>Log In</button>
        </form>
      </div>
    )
}

export default LoginForm
