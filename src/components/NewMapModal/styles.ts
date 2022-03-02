import styled from '@emotion/styled';

import { Palette, Dimension } from 'src/Constants';

export const Container = styled.div<{ open: boolean }>`
    position: absolute;
    z-index: 99;
    bottom: 0;
    display: flex;
    width: calc(${Dimension.MaxWidth} - 2.125rem);
    height: ${({ open }) => (open ? '100vh' : '0')};
    flex-direction: column;
    background-color: #ffffff;
    overflow-y: hidden;
    transition: height 0.5s;
    padding: ${({ open }) => (open ? '1.0625rem' : 0)};
`;

export const Title = styled.div`
    font-size: 1.625rem;
    font-weight: bold;
    line-height: 1;
    letter-spacing: 0.01125rem;
    color: #333;
    margin-top: 7.625rem;
`;

export const Desc = styled.div`
    color: ${Palette.Grey[500]};
    font-size: 1rem;
    font-weight: 300;
    line-height: 2;
    letter-spacing: 0.006875rem;
    margin-top: 0.3125rem;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.875rem;
`;

export const Input = styled.input`
    height: 1.25rem;
    border: 1px solid ${Palette.Grey[400]};
    border-radius: 0.25rem;
    margin-bottom: 1.25rem;
    padding: 0.8125rem;

    &::placeholder {
        font-size: 0.9375rem;
        letter-spacing: -0.21px;
        color: #bebebe;
    }
`;

export const ButtonArea = styled.div`
    display: flex;
    margin-top: auto;
    justify-content:space-between;
}
    `;

export const Button = styled.button`
    width: 48%;
    height: 48px;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    outline: none;
    font-size: 1rem;
    font-weight: 500;
    line-height: 2;
    letter-spacing: 0.11px;
    text-align: center;

    &:hover {
        opacity: 0.8;
    }

    &:first-child {
        color: ${Palette.Grey[500]};
        border: solid 1px #d3d3d3;
        background-color: ${Palette.White};
    }

    &:last-child {
        background-color: ${Palette.Blue[500]};
        color: ${Palette.White};
    }
`;
