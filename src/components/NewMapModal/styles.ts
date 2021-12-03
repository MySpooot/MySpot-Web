import styled from '@emotion/styled';

export const Container = styled.div<{ open: boolean }>`
    position: absolute;
    z-index: 99;
    bottom: 0;
    display: flex;
    width: calc(450px - 4rem);
    height: ${({ open }) => (open ? '100vh' : '0')};
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
    background-color: azure;
    overflow-y: hidden;
    transition: height 0.5s;

    @media screen and (max-width: 768px) {
        width: calc(100% - 4rem);
    }
`;

export const Title = styled.div`
    margin-top: 50%;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const InputArea = styled.div`
    margin-top: 15%;
`;

export const ButtonArea = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 15%;
`;

export const Button = styled.button`
    border: none;
    outline: none;
`;
