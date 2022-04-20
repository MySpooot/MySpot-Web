import styled from '@emotion/styled';

import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 1.375rem 1.625rem;
`;

export const Title = styled.h1`
    margin-top: 3.125rem;
    color: ${Color.blue};
    font-weight: 400;
    line-height: 1.375rem;
`;

export const Description = styled.h3`
    margin-top: 2.5rem;
    font-size: 1.625rem;
    font-weight: 400;
    line-height: 2.5rem;
`;

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3.5rem;
`;
