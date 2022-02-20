import styled from '@emotion/styled';

import { Palette, ScrollbarStyle } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const MapContainer = styled.div`
    width: 100%;
    flex-grow: 1;
`;

export const Map = styled.div`
    width: 100%;
    height: 100%;
`;

export const HeaderIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
`;

export const BottomFloatingArea = styled.div<{ isOpen: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: 0;
    width: 100%;
    background-color: white;

    .header {
        display: flex;
        height: 3.5rem;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .arrow-up {
            width: 1.125rem;
            height: 1.125rem;
            transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0')});
            transition: transform 0.5s;
        }

        .text {
            color: ${Palette.Grey[500]};
            font-size: 0.875rem;
        }
    }

    .place-list {
        ${ScrollbarStyle}
        height: ${({ isOpen }) => (isOpen ? '15rem' : '0')};
        max-height: 15rem;
        overflow-y: auto;
        transition: height 0.5s;
    }
`;

export const FavoriteIcon = styled(Icon)`
    position: absolute;
    z-index: 11;
    top: 3.5rem;
    left: 0.5rem;
    width: 1.875rem;
    height: 1.875rem;
    cursor: pointer;
`;
