import React, { useState } from 'react';

import {
    MenuImage,
    MenuImagePlaceholder,
    MenuItemContainer,
    MenuItemName,
    MenuItemPrice,
    MenuItemDescription
} from './';

function MenuItem(props) {
    const [showDescription, setShowDescription] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(true);

    function toggleImage() {
        setShowDescription(!showDescription);
    }

    const imageError = () => setImageLoaded(false);

    return (
        <MenuItemContainer>
            {props.item.image.length > 0 ? (
                <>
                    <MenuImage src={props.item.image} alt={props.item.description} onClick={toggleImage} onError={imageError} />
                    <MenuItemDescription onClick={toggleImage} visible={showDescription && imageLoaded}>{props.item.description}</MenuItemDescription>
                </>
            ) : <MenuImagePlaceholder>{props.item.description}</MenuImagePlaceholder>}
            <MenuItemName>{props.item.name}</MenuItemName>
            <MenuItemPrice>{props.item.price}</MenuItemPrice>
        </MenuItemContainer>
    )
}

export default MenuItem;