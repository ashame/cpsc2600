import React, { useState } from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { Message, Form } from './components';

function Register(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const [messages, setMessages] = useState([]);
    const [buttonVariant, setButtonVariant] = useState('secondary');

    function validate() {
        let errs = [];
        let name = username.trim();
        if (name.length == 0) errs.push('Please enter a username!')
        else if (name.length < 4) errs.push('Username must be at least 4 characters.');

        if (email.length == 0) errs.push('Please enter an email!')

        if (password.length == 0) errs.push('Please enter a password!')
        else if (password.length < 8) errs.push('Password must be at least 8 characters.');

        if (password != confirmPassword) errs.push('Passwords must match!');
        return errs;
    }

    function handleRegistration(event) {
        event.preventDefault();
        let validationErrors = validate();
        if (validationErrors.length > 0) {
            setButtonVariant('danger');
            setMessages(validationErrors.map(err => ({ type: 'error', text: err })));
        } else {
            axios.post('/api/v1/register', {
                username,
                password,
                email
            }).then(() => {
                setMessages([{ type: 'success', text: 'Account successfully created!' }]);
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setButtonVariant('success');
                setTimeout(() => props.history.push('/'), 2000);
            }).catch(err => {
                let errs = [];
                if (err.response && err.response.status >= 400 && err.response.status < 500) {
                    errs.push(err.response.data.message);
                } else {
                    errs.push('Unknown error');
                }
                setMessages(errs.map(err => ({ type: 'error', text: err })));
            });
        }
        setTimeout(() => {
            setButtonVariant('secondary');
        }, 3000);
    }

    return (
        <Form onSubmit={handleRegistration}>
            {messages.map((msg, i) => <Message color={msg.type == 'error' ? 'red' : 'green'} key={`registration-message-${i}`}>{msg.text}</Message>)}
            <InputGroup className="mb-3">
                <FormControl name="username" placeholder="username" onChange={e => setUsername(e.target.value)} value={username} />
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl type="email" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} value={email} />
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} />
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl type="password" name="confirmPassword" placeholder="confirm password" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} />
                <InputGroup.Append>
                    <Button variant={buttonVariant} type="submit">🡪</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Register;