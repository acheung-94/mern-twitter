import { useState,useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { signup, login } from "../../store/session"
import { clearSessionErrors } from "../../store/session"

const AuthForm = () => {
    const location = useLocation()
    const pathname = location.pathname
    const authType = pathname.split('/')[1]

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const errors = useSelector(state => state.errors.session)
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
          dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (authType === 'login'){
            dispatch(login({ email, password })); 
        }else{
            dispatch(signup( {email, username, password} ))
        }
    }
    

    return(
        <div> 
            <h1>{authType === 'login' ? "Log In" : "Sign Up"}</h1>
            <form onSubmit={handleSubmit}>
                <label> Email </label>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  />
                <div className="errors">{errors?.email}</div>

                {authType === 'signup' && (
                    <>
                        <label > Username </label>
                        <input type="text"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)} />
                        <div className="errors">{errors?.username}</div>
                    </>
                )}

                <label> Password </label>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div className="errors">{errors?.password}</div>

                {authType === 'signup' && (
                    <>
                        <label > Confirm Password </label>
                        <input type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}/>
                        <div className="errors">
                            {password !== password2 && 'Confirm Password field must match'}
                        </div>
                    </>
                )}
                <button type="submit"
                    disabled={!email || !username || !password || password !== password2}>
                    {authType === 'signup' ? "Sign Up" : "Log In"}
                </button>
            </form>

        </div>
    )
}

export default AuthForm