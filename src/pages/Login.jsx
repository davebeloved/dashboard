import React, { useEffect, useState } from 'react'
import * as Components from '../Style'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/userApiSlice'
import { setCredentials } from '../store/authenSlice'
import { useLoginUserMutation } from '../store/apiSlice'
import { useStateContext } from '../context/contextProvider'
import axiosClient from '../store/axios'
import axios from 'axios'

const Login = () => {
    const [signIn, toggle] = React.useState(true)
    const [signup, setSignup] = useState({ name: '', email: '', password: '', password_confirmation: '' })
    // const [login, setLogin] = useState({ email: '', password: '' })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { token } = useSelector((state) => state.auth)
    // const { userInfo } = useSelector((state) => state.authen)
    const [loginUser, { data, isLoading }] = useLoginUserMutation()

    const { currentUser, userToken, setCurrentUser, _setUserToken } = useStateContext()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
    }, [navigate, userToken])

    // handlesignupchange function
    const handleSignUp = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }
    const handleSubmitSignUp = async (e) => {
        e.preventDefault()
        // dispatch(registerUser(signup))
        try {
            const { data } = await axiosClient.post('/register', signup)
            console.log('data--', data)

            _setUserToken(localStorage.setItem('TOKEN', JSON.stringify(data)))
            setCurrentUser(data)
            window.location.reload()
        } catch (error) {
            // console.log(error)
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        // dispatch(loginUser(login))
        try {
            const { data } = await axiosClient.post('/login', {
                email,
                password
            })
            console.log('data--', data)
            _setUserToken(localStorage.setItem('TOKEN', JSON.stringify(data.token)))
            setCurrentUser(localStorage.setItem('USER', JSON.stringify(data.user)))
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Components.Container>
            <Components.SignUpContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type="text" name="name" placeholder="Name" onChange={handleSignUp} />
                    <Components.Input type="email" name="email" placeholder="Email" onChange={handleSignUp} />
                    <Components.Input type="password" name="password" placeholder="Password" onChange={handleSignUp} />
                    <Components.Input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        onChange={handleSignUp}
                    />
                    <Components.Button onClick={handleSubmitSignUp}>Sign Up</Components.Button>
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signinIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign in</Components.Title>
                    <Components.Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        // onChange={(e) => setLogin({ email: e.target.value })}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Components.Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <Components.Anchor href="#">Forgot your password?</Components.Anchor> */}
                    <Components.Button onClick={handleLogin}>Sigin In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signinIn={signIn}>
                <Components.Overlay signinIn={signIn}>
                    <Components.LeftOverlayPanel signinIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us please login with your personal info
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signinIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter Your personal details and start journey with us
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => toggle(false)}>Sigin Up</Components.GhostButton>
                    </Components.RightOverlayPanel>
                </Components.Overlay>
            </Components.OverlayContainer>
        </Components.Container>
    )
}

export default Login
