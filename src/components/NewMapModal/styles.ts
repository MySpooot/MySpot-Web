import styled from '@emotion/styled';

import { BreakPoint, Palette } from 'src/Constants';

export const Container = styled.div<{ open: boolean }>`
    position: absolute;
    z-index: 99;
    bottom: 0;
    display: flex;
    width: 19.625rem;
    height: ${({ open }) => (open ? '100vh' : '0')};
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
    background-color: #ffffff;
    overflow-y: hidden;
    transition: height 0.5s;
`;

export const Myspot = styled.div`
    width: 100%;
    padding-top: 1.125rem;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const Title = styled.div`
    margin-top: 50%;
    font-size: 1.5rem;
    font-weight: bold;
`;

export const Desc = styled.div`
    color: ${Palette.Grey[500]};
    font-size: 1rem;
    font-weight: 300;
    line-height: 2;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 15%;
`;

export const Input = styled.input`
    width: 19.1875rem;
    height: 3rem;
    padding: 0.5rem 1.5rem;
    border: 1px solid ${Palette.Grey[400]};
    border-radius: 0.25rem;
`;

export const ButtonArea = styled.div`
    display: flex;
    width: 19.625rem;
    justify-content: space-between;
    margin-top: 15%;

    ${BreakPoint.PC} {
        width: 70%;
    }
`;

export const Button = styled.button`
    width: 48%;
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: bold;
    outline: none;

    &:hover {
        opacity: 0.8;
    }

    &:last-child {
        background-color: ${Palette.Grey[500]};
        color: ${Palette.Black};
    }

    &:last-child {
        background-color: ${Palette.Blue[500]};
        color: ${Palette.White};
    }
`;
