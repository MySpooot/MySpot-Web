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
`;

export const Main = styled.section`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const NewMapButton = styled.button`
    padding: 1rem 1.5rem;
    border: none;
    cursor: pointer;
    outline: none;
`;
