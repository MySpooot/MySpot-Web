import styled from '@emotion/styled';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
`;

export const Header = styled.header`
    padding: 2rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
`;

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const MapItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    border-top: 1px solid black;

    :last-child {
        border-bottom: 1px solid black;
    }
`;

export const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
`;

export const NewMapButton = styled.button`
    padding: 1rem 1.5rem;
    border: none;
    cursor: pointer;
    outline: none;
`;
