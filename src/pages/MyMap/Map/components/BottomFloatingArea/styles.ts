import styled from '@emotion/styled';

import { Palette, ScrollbarStyle } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div<{ isOpen: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: 0;
    width: 100%;
    background-color: white;
    border-radius: 0.5rem 0.5rem 0 0;

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

export const PlaceListItem = styled.li`
    display: flex;
    height: 5rem;
    padding: 1.25rem 0;
    border-bottom: 0.375rem solid ${Palette.Grey[200]};
    cursor: pointer;

    &:hover {
        opacity: 0.7;
    }
`;

export const AddressName = styled.h3`
    font-size: 1rem;
    font-weight: 500;
`;

export const JibunAddress = styled.div`
    color: #7f7f7f;
    font-size: 0.75rem;
`;

export const RoadAddress = styled.div`
    color: #7f7f7f;
    font-size: 0.75rem;
`;

export const LeftArea = styled.div`
    align-self: center;
    margin: 0 0.875rem;
`;
export const CenterArea = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
`;
export const RightArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 0.875rem;
`;

export const BookmarkIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
`;

export const DeleteButton = styled.button`
    width: fit-content;
    align-self: flex-end;
    border: 1px solid #e8e8e8;
    background-color: #ffffff;
    border-radius: 0.25rem;
    color: #9e9e9e;
    outline: none;
`;
