import styled from '@emotion/styled';

import { BreakPoint } from 'src/Constants';

export const Container = styled.div`
    position: absolute;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: scroll;

    ${BreakPoint.PC} {
        height: unset;
    }
`;

export const PlaceItem = styled.div`
    padding: 1rem 1.5rem;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    cursor: pointer;

    &:nth-child(odd) {
        border: unset;
    }
`;
