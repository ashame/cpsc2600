import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function AccordionMenu(props) {

    const subitemStyle = {
        textAlign: 'left',
        paddingLeft: '3rem',
        borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: '0.15s ease-in-out'
    }

    return (
        <Accordion>
            {props.createRestaurant ? (
                <Card style={{ height: '3em' }}>
                    <Button
                        block
                        size='md' variant='info'
                        style={{ display: 'flex', flex: '1 0 auto', padding: '0  1.25rem', borderRadius: '0', fontSize: '1.6rem', fontWeight: 800, justifyContent: 'center' }}
                        onClick={props.createRestaurant}
                    >+</Button>
                </Card>
            ) : null}
            {props.restaurants.map(restaurant => (
                <Card key={restaurant._id}>
                    <Accordion.Toggle as={Card.Header} eventKey={restaurant._id} id={restaurant._id}>
                        {restaurant.name}
                    </Accordion.Toggle>
                    {restaurant.menus.map(menu => {
                        return (
                            <Accordion.Collapse key={menu._id} eventKey={restaurant._id}>
                                <Card.Body
                                    className="submenuItem"
                                    id={menu._id}
                                    block as={Button}
                                    size='sm' variant='link'
                                    style={subitemStyle}
                                    onClick={props.setActive}>
                                    {menu.name}
                                </Card.Body>
                            </Accordion.Collapse>
                        )
                    })}
                    {props.createMenu ? (
                        <Accordion.Collapse eventKey={restaurant._id}>
                            <Card.Body
                                id={restaurant._id}
                                block as={Button}
                                name={restaurant.name}
                                size='sm' variant='secondary'
                                style={{ borderRadius: '0', padding: '0 0.2rem', fontSize: '1.2rem', fontWeight: 600 }}
                                onClick={props.createMenu}
                            >+</Card.Body>
                        </Accordion.Collapse>
                    ) : null}
                </Card>
            ))}
        </Accordion>
    )
}

export default AccordionMenu;