import React from 'react'
import Form from './LoginRegister/Form'
import Field from './LoginRegister/Field'
import { useState } from 'react'
import { sha256 } from 'js-sha256';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [address, setAddress] = useState('');
    const [cname, setCname] = useState('');
    const [pass, setPass] = useState('');
    const [conf, setConf] = useState('');
    const [loading, setLoading] = useState(false)
    const [success, SetSuccess] = useState('')
    const [error, setError] = useState({
        email: '',
        name: '',
        telephone: '',
        address: '',
        cname: '',
        pass: '',
        conf: ''
    })
    const { userRegister } = useAuth()

    function clearFields() {
        setName('')
        setEmail('')
        setPass('')
        setConf('')
        setTelephone('')
        setCname('')
        setAddress('')
        setError({
            email: '',
            name: '',
            telephone: '',
            address: '',
            cname: '',
            pass: '',
            conf: ''
        })
    }

    function validateEmail(value) {
        const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        return re.test(value);
    }

    function validateTelephone(value) {
        const re = /^.*[a-zA-Z].*$/;
        const re1 = /^.*[-].*$/;
        const re2 = /^[+,0].*$/;
        const re3 = /^[0,+]?[1-9][0-9]{9,14}$/;
        console.log(re1.test(value))
        console.log(re2.test(value))
        console.log(re3.test(value))
        if ((re.test(value))) {
            return "Please insert numbers only"
        }
        if (re1.test(value)) {
            return "Please do not use dash(-) sign";
        }
        else if (!(re2.test(value))) {
            return "Please start with either 0 or +";
        }
        else if (!(re3.test(value))) {
            return "10-15 digits only please";
        }
        return ''
    }

    async function onSubmit(e) {
        e.preventDefault()
        setLoading(true)

        //Reset Variable
        SetSuccess('')
        const errorList = ({
            email: '',
            name: '',
            telephone: '',
            address: '',
            cname: '',
            pass: '',
            conf: ''
        })
        // Name Verification
        if (!name) {
            errorList.name = ('Please insert your Name!');
        }
        // Email Verification
        if (!email) {
            errorList.email = ('Please insert your Email Address!');
        }
        else if (!validateEmail(email)) {
            errorList.email = ('Please insert a valid email')
        }
        // Telephone Verification
        if (!telephone) {
            errorList.telephone = ('Please insert your Telephone Number!');
        }
        const resultTelephoneCheck = validateTelephone(telephone)
        console.log(resultTelephoneCheck)
        if (resultTelephoneCheck) {
            errorList.telephone = resultTelephoneCheck
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
        if (JSON.stringify(errorList) === ('{"email":"","name":"","telephone":"","address":"","cname":"","pass":"","conf":""}')) {
            try {
                const sentData = {
                    "name": name, "email": email,
                    "telephone": telephone, "address": address,
                    "company_name": cname, "password": sha256(pass)
                }
                const response = await userRegister(sentData)
                if (response.status !== 'success') {
                    throw response
                }
                SetSuccess('Success! Press here to go to login page !')
                setName('')
                setEmail('')
                setPass('')
                setConf('')
                setTelephone('')
                setCname('')
                setAddress('')
            } catch (errorException) {
                console.log(errorException)
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


    return (
        <Form.RegisterContainer onSubmit={onSubmit}>
            <Form.Row>
                <Form.SubRow>
                    <Field error={error.name} label="Name" name="name" placeholder="Name"
                        value={name} onChange={(e) => setName(e.target.value)} />
                </Form.SubRow>
                <Form.SubRow>
                    <Field error={error.email} label="Email" name="email" placeholder="Email"
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.SubRow>
            </Form.Row>
            <Form.Row>
                <Form.SubRow>
                    <Field error={error.telephone} label="Telephone" name="telephone" placeholder="Telephone"
                        value={telephone} onChange={(e) => setTelephone(e.target.value)} />
                </Form.SubRow>
                <Form.SubRow>
                    <Field error={error.address} label="Address" name="address" placeholder="Address"
                        value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.SubRow>
            </Form.Row>
            <Form.Row>
                <Form.SubRow>
                    <Field error={error.cname} label="Company Name" name="cname" placeholder="Company Name"
                        value={cname} onChange={(e) => setCname(e.target.value)} />
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
