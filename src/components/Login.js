import React from 'react'
import Form from './LoginRegister/Form'
import Field from './LoginRegister/Field'
import { useState } from 'react'
import { useAuth } from './../context/AuthContext';
import { sha256 } from 'js-sha256';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const { userLogin } = useAuth()
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
                const sentData = { "email": email, "password": sha256(pass) }
                await userLogin(sentData)
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
        <Form.LoginContainer onSubmit={onSubmit}>
            <Form.Row>
                <Form.SubRow>
                    <Field label="Email" name="email" placeholder="Email"
                        value={email} error={error.email} onChange={(e) => setEmail(e.target.value)} />
                </Form.SubRow>
            </Form.Row>
            <Form.Row>
                <Form.SubRow>
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
                </Form.SubRow>
            </Form.Row>
            <Form.SubmitButton />
        </Form.LoginContainer>
    )
}

export default Login
