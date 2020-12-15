import React, { useEffect, useState } from 'react';

import axios from 'axios';

import {
    AccordionMenu,
    MenuView,
    SplitContainer
} from './components';

function Home() {

    const [activeMenu, setActiveMenu] = useState(null);
    const [menuData, setMenuData] = useState(null);
    const [restaurantData, setRestaurantData] = useState([]);

    const displayMenu = e => setActiveMenu(e.target.id);

    useEffect(() => {
        axios.get(`/api/v1/restaurants`).then(res => {
            setRestaurantData(res.data.sort((a, b) => a.name > b.name));
        }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (activeMenu != null)
            axios.get(`/api/v1/menus/${activeMenu}`).then(res => {
                setMenuData(res.data);
            }).catch(err => console.log(err));
    }, [activeMenu])

    return (
        <SplitContainer>
            <AccordionMenu
                restaurants={restaurantData}
                setActive={displayMenu}
            />
            <MenuView
                activeMenu={activeMenu}
                menuData={menuData}
            />
        </SplitContainer>
    )
}

export default Home;