import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { Form, Message } from './components';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [messages, setMessages] = useState([]);
    const [buttonVariant, setButtonVariant] = useState('secondary');

    function validate(e) {
        e.preventDefault();

        let errors = [];
        let name = username.trim();
        if (name.length == 0) errors.push('Please enter a username!')
        else if (name.length < 4) errors.push('Username must be at least 4 characters.');

        if (password.length == 0) errors.push('Please enter a password!')
        else if (password.length < 8) errors.push('Password must be at least 8 characters.')

        if (errors.length == 0) {
            props.handleLogin(username, password).then(() => {
                setButtonVariant('success');
                setMessages([]);
                setTimeout(() => props.history.push('/manage'), 1500);
            }).catch(err => {
                if (err.response && err.response.data) {
                    setMessages([{ type: 'error', text: err.response.data.message }]);
                    setButtonVariant('danger');
                    setTimeout(() => {
                        setButtonVariant('secondary');
                    }, 1500);
                } else {
                    setMessages([{ type: 'error', text: 'Unknown error occurred' }]);
                    setButtonVariant('danger');
                    setTimeout(() => {
                        setButtonVariant('secondary');
                    }, 1500);
                }
            });
        } else {
            setMessages(errors.map(error => ({ type: 'error', text: error })));
            setButtonVariant('danger');
            setTimeout(() => {
                setButtonVariant('secondary');
            }, 1500);
        }
    }

    return (
        <Form onSubmit={validate} >
            {messages.map((msg, i) => <Message color={msg.type == 'error' ? 'red' : 'green'} key={`login-message-${i}`}>{msg.text}</Message>)}
            <InputGroup className="mb-3">
                <FormControl placeholder="username" name="username" onChange={e => setUsername(e.target.value)} />
            </InputGroup>
            <InputGroup className="mb-3">
                <FormControl type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <InputGroup.Append>
                    <Button variant={buttonVariant} type="submit">🡪</Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Login;