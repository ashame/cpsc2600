import React from 'react';

import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Navigation(props) {
    return (
        <Navbar bg='dark' variant='dark' style={{minHeight: '3em'}}>
            <Navbar.Brand as={Link} to='/'>Home</Navbar.Brand>
            <Nav className="mr-auto" />
            <Nav>
                {!props.loggedIn ? (
                    <>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                        <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                    </>
                ) : (
                        <>
                            <Nav.Link as={Link} to='/manage'>Manage</Nav.Link>
                            <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                        </>
                    )}

            </Nav>
        </Navbar>
    )
}

export default Navigation;