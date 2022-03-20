import styled from '@emotion/styled';

import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    width: 25rem;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem;
    background-color: ${Color.white};
`;

export const Title = styled.h3`
    font-size: 1.125rem;
    font-weight: 700;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${Color.grey[300]};
    margin: 1.25rem;
    border-radius: 0.25rem;
    outline: none;

    &::placeholder {
        color: ${Color.grey[400]};
    }
`;
