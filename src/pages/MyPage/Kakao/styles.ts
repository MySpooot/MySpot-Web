import styled from '@emotion/styled';

import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const Footer = styled.footer`
    display: flex;
    padding-top: 0.625rem;
    padding-bottom: 1.25rem;
`;

export const CloseButton = styled.button`
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid ${Color.blue};
    border-radius: 0.25rem;
    color: ${Color.blue};
    cursor: pointer;
    font-weight: 500;
    line-height: 2;
`;
