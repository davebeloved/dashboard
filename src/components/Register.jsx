import React, { useEffect, useState } from 'react'
import * as Components from '../Style'
import axiosClient from '../store/axios'
import { useNavigate } from 'react-router-dom'

const Register = ({ signIn }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPassword_confirmation] = useState('')

    const { _setUserToken, userToken } = useState()
    const navigate = useNavigate()

    const handleSubmitSignUp = async (e) => {
        e.preventDefault()
        // dispatch(registerUser(signup))
        try {
            const { data } = await axiosClient.post('/register', {
                name,
                email,
                password,
                password_confirmation
            })

            // _setUserToken(localStorage.setItem('TOKEN', JSON.stringify(data)))
            // _setUserToken(localStorage.setItem('TOKEN', data))
            // setCurrentUser(data)

            window.location.reload()
        } catch (error) {
            // console.log(error)
        }
    }

    return (
        <Components.SignUpContainer signinIn={signIn}>
            <Components.Form>
                <Components.Title>Create Account</Components.Title>
                <Components.Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <Components.Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Components.Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Components.Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    onChange={(e) => setPassword_confirmation(e.target.value)}
                />
                <Components.Button onClick={handleSubmitSignUp}>Sign Up</Components.Button>
            </Components.Form>
        </Components.SignUpContainer>
    )
}

export default Register