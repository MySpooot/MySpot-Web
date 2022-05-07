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
    background-color: ${Color.white};
    overflow-y: hidden;
    transition: height 0.5s;
`;

export const Main = styled.div`
    display: flex;
    height: calc(100vh - 9.5rem);
    flex-direction: column;
    justify-content: space-between;
    padding: 1.25rem;
`;

export const Title = styled.div`
    margin-top: 2rem;
    margin-bottom: 2.5rem;
    color: ${Color.blue};
    font-weight: 500;
    line-height: 1.375rem;
`;

export const Desc = styled.div`
    margin-bottom: 2.75rem;
    color: ${Color.black};
    font-size: 1.625rem;
    font-weight: 500;
    line-height: 2.25rem;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;

    input {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.25rem;
    }

    img {
        width: 1.375rem;
        height: 1.375rem;
    }
`;

export const ClickPrivate = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    cursor: pointer;
`;

export const ButtonArea = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;

    Button {
        color: ${Color.grey};
    }
`;
