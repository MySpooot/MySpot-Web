import styled from '@emotion/styled';

import { BreakPoint } from '@src/Constants';

export const Container = styled.div<{ open: boolean }>`
    position: absolute;
    z-index: 99;
    bottom: 0;
    display: flex;
    width: calc(100% - 4rem);
    height: ${({ open }) => (open ? '100vh' : '0')};
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
    background-color: azure;
    overflow-y: hidden;
    transition: height 0.5s;

    ${BreakPoint.PC} {
        width: calc(768px - 4rem);
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

export const Input = styled.input`
    padding: 1rem 2.5rem;
    border: 1px solid grey;
    border-radius: 1rem;
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15%;

    ${BreakPoint.PC} {
        width: 70%;
    }
`;

export const Button = styled.button`
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 10%;
    cursor: pointer;
    font-weight: bold;
    outline: none;

    &:hover {
        opacity: 0.8;
    }
`;
