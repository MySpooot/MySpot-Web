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

export const CloseHeader = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
`;

export const Title = styled.h3`
    margin-bottom: 2.18rem;
    font-size: 1.125rem;
    font-weight: 400;
`;

export const BtnArea = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    .full-half {
        width: 100%;
    }
`;
