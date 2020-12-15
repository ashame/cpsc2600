import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import Button from 'react-bootstrap/Button';

import {
    AccordionMenu,
    CreateMenu,
    CreateMenuItem,
    CreateRestaurant,
    MenuView,
    SplitContainer
} from './components';

function Manage(props) {
    if (!props.userId || !props.sessionId) return <Redirect to="/login" />;

    const [menuData, setMenuData] = useState(null);
    const [restaurantData, setRestaurantData] = useState([]);

    const [activeMenu, setActiveMenu] = useState(null);
    const [activeRestaurant, setActiveRestaurant] = useState(null);

    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [showCreateMenuItem, setShowCreateMenuItem] = useState(false);
    const [showCreateRestaurant, setShowCreateRestaurant] = useState(false);

    function updateData() {
        axios.get(`/api/v1/restaurants/owner/${props.userId}`).then(res => {
            let data = new Map();
            res.data.sort((a, b) => a.name > b.name)
                .forEach(restaurant => data.set(restaurant._id, restaurant));
            setRestaurantData(data);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        if (props.userId && props.sessionId) updateData();
    }, []);

    useEffect(() => {
        if (activeMenu != null)
            axios.get(`/api/v1/menus/${activeMenu}`).then(res => {
                setMenuData(res.data);
            }).catch(err => console.log(err));
    }, [activeMenu])

    function createMenu(e) {
        setActiveRestaurant(restaurantData.get(e.target.id));
        setShowCreateMenu(true);
    }

    function createMenuItem() {
        setShowCreateMenuItem(true);
    }

    function createRestaurant(e) {
        setShowCreateRestaurant(true);
    }

    function displayMenu(e) {
        setActiveMenu(e.target.id);
    }

    return (
        <>
            <CreateMenu
                activeRestaurant={activeRestaurant}
                sessionId={props.sessionId}
                showModal={showCreateMenu}
                setShowModal={setShowCreateMenu}
                setActiveMenu={setActiveMenu}
                updateData={updateData}
            />
            <CreateRestaurant
                sessionId={props.sessionId}
                showModal={showCreateRestaurant}
                setShowModal={setShowCreateRestaurant}
                updateData={updateData}
            />
            <CreateMenuItem
                sessionId={props.sessionId}
                activeMenu={activeMenu}
                showModal={showCreateMenuItem}
                setShowModal={setShowCreateMenuItem}
                updateData={setMenuData}
            />
            <SplitContainer>
                <AccordionMenu 
                    restaurants={Array.from(restaurantData.values())}
                    createRestaurant={createRestaurant}
                    createMenu={createMenu}
                    setActive={displayMenu}
                />
                <MenuView 
                    activeMenu={activeMenu}
                    menuData={menuData}
                    createMenuItem={createMenuItem}
                />
            </SplitContainer>
        </>
    )
}

export default Manage;