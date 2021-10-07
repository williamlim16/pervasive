import React from 'react'
import Form from './LoginRegister/Form'
import Field from './LoginRegister/Field'
import { useState } from 'react'
function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [conf, setConf] = useState('');
    const [loading, setLoading] = useState(false)
    const [success, SetSuccess] = useState('')
    const [error, setError] = useState({
        email: '',
        name: '',
        pass: '',
        conf: ''
    })
    // const { register } = useAuth()

    function clearFields() {
        setName('')
        setEmail('')
        setPass('')
        setConf('')
        setError({
            email: '',
            name: '',
            pass: '',
            conf: ''
        })
    }

    async function onSubmit(e) {
        e.preventDefault()
        setLoading(true)

        //Reset Variable
        SetSuccess('')
        const errorList = ({
            email: '',
            name: '',
            pass: '',
            conf: ''
        })
        // Name Verification
        if (!name) {
            errorList.name = ('Please insert your Username!');
        }
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
        //Password Confirmation Verification
        if (!conf) {
            errorList.conf = ('Please confirm your password!');
        }
        else if (pass !== conf) {
            errorList.conf = ("Your input is not the same as your password!");
        }
        if (JSON.stringify(errorList) === ('{"email":"","name":"","pass":"","conf":""}')) {
            try {
                // const response = await register(name, email, pass)
                // if (response !== true) {
                //     throw response
                // }
                alert("Success!")
                SetSuccess('Success! Press here to go to login page !')
                setEmail('')
                setPass('')
                setConf('')
            } catch (errorException) {
                if (errorException.code.search('email')) {
                    errorList.email = errorException.message
                }
                else alert(errorException.message)
            }
        }
        setError(function () {
            return errorList
        })
        setLoading(false)



    }

    function validateEmail(value) {
        const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return re.test(value);
    }

    return (
        <Form.RegisterContainer onSubmit={onSubmit}>
            <Form.Row>
                <Form.SubRow>
                    <Field error={error.name} label="Name" name="name" placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </Form.SubRow>
            </Form.Row>
            <Form.Row>
                <Form.SubRow>
                    <Field error={error.email} label="Email" name="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.SubRow>
            </Form.Row>
            <Form.Row>
                <Form.SubRow>
                    <Field
                        label="Password"
                        iconSelect="LockIcon"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={pass}
                        error={error.pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                </Form.SubRow>
                <Form.SubRow>
                    <Field
                        label="Confirm Password"
                        iconSelect="LockIcon"
                        name="confirmpassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={conf}
                        error={error.conf}
                        onChange={(e) => setConf(e.target.value)}
                    />
                </Form.SubRow>
            </Form.Row>
            <Form.Success success={success} />
            <Form.RegisterButton loading={loading} clearFields={() => clearFields()} />
        </Form.RegisterContainer>
    )
}

export default Login
