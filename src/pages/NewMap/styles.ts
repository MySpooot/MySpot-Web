import styled from '@emotion/styled';

import { Color, Dimension } from 'src/Constants';

export const Container = styled.div`
    position: absolute;
    z-index: 99;
    bottom: 0;
    display: flex;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    height: 100vh;
    flex-direction: column;
    background-color: #ffffff;
    overflow-y: hidden;
    transition: height 0.5s;
`;

export const Main = styled.div`
    padding: 1.25rem;
    height: calc(100vh - 9.5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Title = styled.div`
    margin-top: 2rem;
    margin-bottom: 2.5rem;
    color: #008fff;
    font-weight: 500;
    line-height: 1.375rem;
`;

export const Desc = styled.div`
    margin-bottom: 2.75rem;
    color: #000000;
    font-size: 1.625rem;
    line-height: 2.25rem;
    font-weight: 500;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;

    input {
        font-weight: 400;
        font-size: 1rem;
        line-height: 1.25rem;
    }

    img {
        width: 1.375rem;
        height: 1.375rem;
    }
`;

export const ClickPrivate = styled.div`
    cursor: pointer;
    display: flex;
    alignitems: center;
    width: fit-content;
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    Button {
        height: 4.125rem;
        color: #7f7f7f;
    }
`;
