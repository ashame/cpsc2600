import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import { Message } from './';

function CreateMenuItem(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [buttonVariant, setButtonVariant] = useState('secondary');
    const [messages, setMessages] = useState([]);

    const hideModal = () => {
        props.setShowModal(false)
        resetData();
    };

    function resetData() {
        setName('');
        setDescription('');
        setImage('');
        setPrice(0);
        setMessages([]);
        setButtonVariant('secondary');
        setButtonEnabled(true);
    }

    function fieldChanged(e) {
        const value = e.target.value;
        switch (e.target.name) {
            case 'name':
                setName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'image':
                setImage(value);
                break;
            case 'price':
                setPrice(value);
                break;
            default: break;
        }
    }

    function handleMenuItemCreate(e) {
        e.preventDefault();
        setButtonEnabled(false);
        axios.post(`/api/v1/menus/${props.activeMenu}/addItem`, {
            sessionId: props.sessionId,
            name: name.trim(),
            description: description.trim(),
            image: image.trim(),
            price: parseFloat(price)
        }).then(res => {
            setMessages([{ type: 'success', text: 'Menu item successfully added!' }]);
            setButtonVariant('success');
            props.updateData(res.data)
            setTimeout(() => {
                hideModal();
                setButtonEnabled(true);
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
        <Modal centered
            size='lg'
            show={props.showModal}
            backdrop='static'
            onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Menu Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleMenuItemCreate}>
                    {messages.map((msg, i) => <Message color={msg.type == 'error' ? 'red' : 'green'} key={`create-menu-message-${i}`}>{msg.text}</Message>)}
                    <InputGroup className='mb-3'>
                        <FormControl
                            minLength='4'
                            placeholder='name'
                            name='name'
                            value={name}
                            onChange={fieldChanged}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='description'
                            name='description'
                            value={description}
                            onChange={fieldChanged}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='url'
                            placeholder='image url (https://example.com)'
                            name='image'
                            value={image}
                            pattern='http(s?)://.*'
                            onChange={fieldChanged}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='number'
                            min='0.00'
                            max='1000.00'
                            step='0.01'
                            placeholder='price'
                            name='price'
                            value={price}
                            onChange={fieldChanged}
                            required
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

export default CreateMenuItem;