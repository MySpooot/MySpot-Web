import styled from '@emotion/styled';

import { Palette, Dimension } from 'src/Constants';

export const Container = styled.div`
    position: absolute;
    z-index: 99;
    bottom: 0;
    display: flex;
    width: ${Dimension.MaxWidth};
    height: 100vh;
    flex-direction: column;
    padding: 1.0625rem;
    background-color: #ffffff;
    overflow-y: hidden;
    transition: height 0.5s;
`;

export const Title = styled.div`
    margin-top: 7.625rem;
    color: #333;
    font-size: 1.625rem;
    font-weight: bold;
    letter-spacing: 0.01125rem;
    line-height: 1;
`;

export const Desc = styled.div`
    margin-top: 0.3125rem;
    color: ${Palette.Grey[500]};
    font-size: 1rem;
    font-weight: 300;
    letter-spacing: 0.006875rem;
    line-height: 2;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.875rem;
`;

export const Input = styled.input`
    height: 1.25rem;
    padding: 1.45rem;
    border: 1px solid ${Palette.Grey[400]};
    margin-bottom: 1.25rem;
    border-radius: 0.25rem;

    &::placeholder {
        color: #bebebe;
        font-size: 0.9375rem;
        letter-spacing: -0.21px;
    }
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
`;
