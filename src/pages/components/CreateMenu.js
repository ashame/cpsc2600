import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import { Message } from './';

function CreateMenu(props) {
    const [name, setName] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [buttonVariant, setButtonVariant] = useState('secondary');
    const [messages, setMessages] = useState([]);

    const hideModal = () => {
        props.setShowModal(false)
        resetData();
    };

    function resetData() {        
        setName('');
        setMessages([]);
        setButtonVariant('secondary');
        setButtonEnabled(true);
    }

    function nameChanged(e) {
        setName(e.target.value);
    }

    function handleMenuCreate(e) {
        e.preventDefault();
        setButtonEnabled(false)
        axios.post(`/api/v1/menus/new`, {
            sessionId: props.sessionId,
            restaurantId: props.activeRestaurant._id,
            name
        }).then(res => {
            setMessages([{ type: 'success', text: 'Menu successfully added!' }]);
            setButtonVariant('success');
            props.updateData();
            setTimeout(() => {
                hideModal();
                props.setActiveMenu(res.data._id);
            }, 1000)
        }).catch(err => {
            if (err.status >= 400 && err.status < 500) {
                setMessages([{ type: 'error', text: err.response.data.message }]);
                setButtonVariant('danger');
                setTimeout(() => {
                    setButtonVariant('secondary');
                    setButtonEnabled(true);
                }, 1500);
            } else {
                setMessages([{ type: 'error', text: 'Unknown error occurred' }]);
                setButtonVariant('danger');
                setTimeout(() => {
                    setButtonVariant('secondary');
                    setButtonEnabled(true);
                }, 1500);
            }
        })
    }

    return (
        <Modal centered size='lg' show={props.showModal} backdrop='static' onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.activeRestaurant && props.activeRestaurant.name} - New Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleMenuCreate}>
                    {messages.map((msg, i) => <Message color={msg.type == 'error' ? 'red' : 'green'} key={`create-menu-message-${i}`}>{msg.text}</Message>)}
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='name'
                            name='name'
                            value={name}
                            onChange={nameChanged}
                        />
                        <InputGroup.Append>
                            <Button variant={buttonVariant} disabled={!buttonEnabled} type="submit">🡪</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </form>
            </Modal.Body>
        </Modal>
    )

}

export default CreateMenu;