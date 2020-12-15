import React from 'react';

import Button from 'react-bootstrap/Button';

import {
    MenuGrid,
    MenuImagePlaceholder,
    MenuItem,
    MenuItemContainer,
    RestaurantInfo,
    RestaurantName,
    RightPane
} from './';

function MenuView(props) {
    if (!props.activeMenu || !props.menuData) return <div></div>
    return (
        <div>
            <RightPane header>
                <RestaurantName>{props.menuData.restaurant}</RestaurantName>
                <RestaurantInfo>{props.menuData.address.lineOne} | {props.menuData.address.city}, {props.menuData.address.province} {props.menuData.phone ? `| ${props.menuData.phone.toString().replace(/([0-9]{3})([0-9]{3})(.*)/,'$1-$2-$3')}` : null}</RestaurantInfo>
                <RestaurantInfo bolder>{props.menuData.name}</RestaurantInfo>
            </RightPane>
            <MenuGrid>
                {props.createMenuItem ? (
                    <MenuItemContainer>
                        <Button variant='outline-secondary' as={MenuImagePlaceholder} onClick={props.createMenuItem}>New Item</Button>
                    </MenuItemContainer>
                ) : props.menuData.items.length == 0 ? (
                    <MenuItemContainer>
                        <MenuImagePlaceholder>
                            No Items Available
                        </MenuImagePlaceholder>
                    </MenuItemContainer>
                ) : null}
                {props.menuData.items.length > 0 ? (
                    props.menuData.items.map(item => <MenuItem key={item._id} item={item} />)
                ) : null}
            </MenuGrid>
        </div>
    )
}

export default MenuView;