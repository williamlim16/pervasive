import React from 'react'
import LoginForm from './LoginForm/LoginForm'
import Field from './LoginForm/Field'
import { useState } from 'react'
function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    //const { login } = useAuth()
    const [error, setError] = useState({
        email: '',
        pass: ''
    });
    function validateEmail(value) {
        const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return re.test(value);
    }

    async function onSubmit(e) {
        e.preventDefault()

        const errorList = ({
            email: '',
            pass: ''
        });
        // Email Verification
        if (!email) {
            errorList.email = ('Please insert your Email Address!');
        }
        else if (!validateEmail(email)) {
            errorList.email = ('Please insert a valid email')
        }
        // Password Verification
        if (!pass) {
            errorList.pass = ('Please insert your password!');
        }
        if (JSON.stringify(errorList) === ('{"email":"","pass":""}')) {
            try {
                //await login(email, pass)
                alert("Success Login!")
                setEmail('')
                setPass('')

            } catch ({ exception }) {
                alert(exception)
            }
        }
        setError(function () {
            return errorList
        })

    }

    return (
        <LoginForm.Container onSubmit={onSubmit}>
            <LoginForm.Row>
                <LoginForm.SubRow>
                    <Field label="Email" name="email" placeholder="Email"
                        value={email} error={error.email} onChange={(e) => setEmail(e.target.value)} />
                </LoginForm.SubRow>
            </LoginForm.Row>
            <LoginForm.Row>
                <LoginForm.SubRow>
                    <Field
                        // icon={<LockIcon />}
                        label="Password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        error={error.pass}
                    />
                </LoginForm.SubRow>
            </LoginForm.Row>
            <LoginForm.SubmitButton />
        </LoginForm.Container>
    )
}

export default Login
