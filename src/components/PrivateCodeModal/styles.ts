import styled from '@emotion/styled';

import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    width: 25rem;
    flex-direction: column;
    padding: 1.25rem;
    background-color: ${Color.white};
    align-items: center;
`;

export const Title = styled.h3`
    font-weight: 700;
    font-size: 1.125rem;
`;

export const Input = styled.input`
    margin: 1.25rem;
    width: 100%;
    padding: 0.75rem;
    outline: none;
    border: 1px solid ${Color.grey[300]};
    border-radius: 0.25rem;

    &::placeholder {
        color: ${Color.grey[400]};
    }
`;

export const Button = styled.button`
    background-color: ${Color.blue};
    width: 100%;
    color: ${Color.white};
    padding: 0.75rem 0;
    border-radius: 0.25rem;
    line-height: 1.25rem;

    :disabled {
        background-color: ${Color.grey[100]};
        color: ${Color.grey[600]};
    }
`;
