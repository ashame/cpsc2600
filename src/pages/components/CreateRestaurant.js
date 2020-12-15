import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';

import { Message } from './';

function CreateRestaurant(props) {
    const provinces = ['AB', 'BC', 'MB', 'NB', 'NL', 'NT', 'NS', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

    const [name, setName] = useState('');
    const [lineOne, setLineOne] = useState('');
    const [lineTwo, setLineTwo] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState(provinces[0]);
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');

    const [buttonEnabled, setButtonEnabled] = useState(true);
    const [buttonVariant, setButtonVariant] = useState('secondary');
    const [messages, setMessages] = useState([]);

    const hideModal = () => {
        props.setShowModal(false);
        resetData();
    }

    function resetData() {
        setName('');
        setLineOne('');
        setLineTwo('');
        setCity('');
        setProvince(provinces[0]);
        setPostalCode('');
        setPhone('');
        setWebsite('');
        setMessages([]);
        setButtonVariant('secondary');
        setButtonEnabled(true);
    }

    function handleRestaurantCreate(e) {
        e.preventDefault();
        setButtonEnabled(false);
        axios.post(`/api/v1/restaurants/new`, {
            sessionId: props.sessionId,
            name: name.trim(),
            address: {
                lineOne: lineOne.trim(),
                lineTwo: lineTwo.trim(),
                city: city.trim(),
                province,
                postalCode: postalCode.trim().toUpperCase()
            },
            phone: parseInt(phone.trim()),
            website: website.trim()
        }).then(() => {
            setMessages([{ type: 'success', text: 'Restaurant successfully added!' }]);
            setButtonVariant('success');
            props.updateData();
            setTimeout(() => {
                hideModal();
            }, 1000);
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

    function handleChange(e) {
        const value = e.target.value;
        switch (e.target.name) {
            case 'name':
                setName(value);
                break;
            case 'lineOne':
                setLineOne(value);
                break;
            case 'lineTwo':
                setLineTwo(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'province':
                setProvince(value);
                break;
            case 'postalCode':
                setPostalCode(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'website':
                setWebsite(value);
                break;
            default:
                break;
        }
    }

    return (
        <Modal centered
            size='lg'
            show={props.showModal}
            backdrop='static'
            onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>New Restaurant</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleRestaurantCreate}>
                    {messages.map((msg, i) => <Message color={msg.type == 'error' ? 'red' : 'green'} key={`create-menu-message-${i}`}>{msg.text}</Message>)}
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='name'
                            minLength='3'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='address line 1'
                            name='lineOne'
                            value={lineOne}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='address line 2'
                            name='lineTwo'
                            value={lineTwo}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='city'
                            name='city'
                            value={city}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            as="select"
                            title='province'
                            name='province'
                            value={province}
                            onChange={handleChange}
                        >
                            {provinces.map(name => <option key={`province-option-${name}`} value={name}>{name}</option>)}
                        </FormControl>
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder='postal code (A0A 0A0)'
                            name='postalCode'
                            value={postalCode}
                            pattern='[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]'
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='tel'
                            minLength='10'
                            maxLength='10'
                            placeholder='phone'
                            name='phone'
                            value={phone}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='url'
                            placeholder='website (http(s)://example.com)'
                            name='website'
                            value={website}
                            pattern='http(s?)://.*'
                            onChange={handleChange}
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

export default CreateRestaurant;