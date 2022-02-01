import styled from '@emotion/styled';

import { Palette } from 'src/Constants';
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
    width: 2.25rem;
    height: 2.25rem;
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
        height: ${({ isOpen }) => (isOpen ? '25vh' : '0')};
        max-height: 800px;
        overflow-y: hidden;
        transition: height 0.5s;
    }
`;

export const FavoriteIcon = styled(Icon)`
    position: absolute;
    width: 1.875rem;
    height: 1.875rem;
    z-index: 11;
    top: 3.5rem;
    left: 0.5rem;
    cursor: pointer;
`;
