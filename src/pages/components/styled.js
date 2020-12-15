import styled from 'styled-components';

export const Message = styled.span`
    color: ${props => props.color ? props.color : "green"};
    font-weight: 400;
    :last-of-type {
        margin-bottom: 1rem;
    }
`;

export const Form = styled.form`
    display: flex;
    margin: auto;
    width: 20rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media(max-width: 700px) {
        width: 100%;
        margin-top: 2em;
    }
`;

export const SplitContainer = styled.div`
    display: grid;
    grid-template-columns: ${props => props.width ? props.width : '300px'} auto;
    column-gap: 1em;
    flex: 1 0 auto;
    margin: 1em;

    @media(max-width: 940px) {
        grid-template-columns: 100%;
        grid-template-rows: auto;
        margin: 0;
        padding: 0;
        row-gap: 1em;
        column-gap: 0;
    }
`;

export const LeftPane = styled.div`
    background: grey;
`;

export const RightPane = styled.div`
    background: rgba(0, 0, 0, ${props => props.header ? 0.12 : 0.03});
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
`;

export const MenuGrid = styled.div`
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    padding: 1.5rem 1.25rem;
    margin-bottom: 1rem;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 2em;
    transition: grid-template-columns 0.2s ease-in-out;

    @media (max-width: 1600px) {
        grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1350px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: 100%;
    }
`;

export const MenuImage = styled.img`
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
    background: grey;
    line-height: 9em;
`;

export const MenuImagePlaceholder = styled.span`
    width: 200px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px dashed black;
    border-radius: 8px;
    font-weight: 400;
`;

export const MenuItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    width: 200px;
    height: 200px;
    transition: display 0.2s ease-in-out;

    @media (max-width: 480px) {
        display: grid;
        grid-template-columns: 100%;
    }
`;

export const MenuItemName = styled.span``;

export const MenuItemPrice = styled.span``;

export const MenuItemDescription = styled.span`
    position: absolute;
    display: flex;
    opacity: ${props => props.visible ? '1' : '0'};
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 150px;
    word-wrap: break-word;
    margin: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 1em;
    transition: opacity 0.3s ease-in-out;
    border-radius: 8px;

    @media (max-width: 480px) {
        height: 100px;
        margin: auto;
    }
`;

export const RestaurantName = styled.h1`
    font-size: 3rem;
    text-align: center;
    transition: font-size 0.2s ease-in-out;

    @media (max-width: 585px) { 
        font-size: 2rem;       
    }

    @media (max-width: 480px) {
        font-size: 1.55rem;
    }
`;

export const RestaurantInfo = styled.h2`
    font-size: 1rem;
    text-align: center;
    ${props => props.bolder ? "font-weight: 600;" : ''}
    transition: font-size 0.2s ease-in-out;
    
    @media (max-width: 585px) {
        font-size: 0.8rem;        
    }

    @media (max-width: 480px) {
        font-size: 0.7rem;
    }
`;
