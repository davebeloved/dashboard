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
import Register from '../components/Register'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'
import { ColorRing } from 'react-loader-spinner'

const Login = () => {
    const [signIn, toggle] = React.useState(true)
    // const [signup, setSignup] = useState({ name: '', email: '', password: '', password_confirmation: '' })
    // const [login, setLogin] = useState({ email: '', password: '' })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { token } = useSelector((state) => state.auth)
    // const { userInfo } = useSelector((state) => state.authen)
    const [loginUser, { data, isLoading }] = useLoginUserMutation()
    const [loading, setLoading] = useState(false)

    const { currentUser, userToken, setCurrentUser, _setUserToken } = useStateContext()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        // dispatch(loginUser(login))
        try {
            setLoading(true)
            const { data } = await axiosClient.post('/login', {
                email,
                password
            })

            _setUserToken(localStorage.setItem('TOKEN', JSON.stringify(data.token)))
            toast.success('Login Successfully, Redirecting to dashboard', { position: 'top-center' })
            setLoading(false)
            setTimeout(() => {
                window.location.reload()
            }, 2000)

            // _setUserToken(localStorage.setItem('TOKEN', data.token))
            // setCurrentUser(localStorage.setItem('USER', JSON.stringify(data.user)))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (userToken) {
            navigate('/')
        }
    }, [])

    return (
        <Components.Container>
            <Register signIn={signIn} />
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
                    <Components.Button className="" disabled={loading} onClick={handleLogin}>
                        {loading ? (
                            <ColorRing
                                visible={true}
                                height="20"
                                width="30"
                                ariaLabel="blocks-loading"
                                wrapperClass="blocks-wrappers"
                                colors={['#e15b64', '#ffff', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        ) : (
                            'Sign In'
                        )}
                    </Components.Button>
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
