import styled from '@emotion/styled';

import { Palette } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    position: relative;
`;

export const Header = styled.div`
    display: flex;
    height: 3rem;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;

    .title {
        font-size: 0.875rem;
        font-weight: 500;
    }
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
    cursor: pointer;
    width: 2.25rem;
    height: 2.25rem;
`;

export const BottomFloatingArea = styled.div<{ isOpen: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: 0;
    background-color: white;
    width: 100%;

    .header {
        flex-direction: column;
        height: 3.5rem;
        display: flex;
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
        transition: height 0.5s;
        max-height: 800px;
        height: ${({ isOpen }) => (isOpen ? '25vh' : '0')};
        overflow-y: hidden;
    }
`;
