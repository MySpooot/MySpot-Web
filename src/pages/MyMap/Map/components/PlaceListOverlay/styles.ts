import styled from '@emotion/styled';

import { Color, ScrollbarStyle } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    position: absolute;
    z-index: 99;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.25);
`;

export const Wrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: ${Color.white};
`;

export const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
`;

export const Total = styled.div`
    color: ${Color.grey[500]};
`;

export const CloseIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

export const PlaceList = styled.ul`
    ${ScrollbarStyle}
    display: flex;
    overflow: auto;
    min-height: 20rem;
    max-height: 35rem;
    flex-direction: column;
`;
