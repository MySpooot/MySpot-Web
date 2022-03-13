import styled from '@emotion/styled';

import { Color } from 'src/Constants';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid ${Color.blue};
    border-bottom: 5px solid ${Color.grey[300]};
    animation: spin 1s linear infinite;
    position: relative;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
