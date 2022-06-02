import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div<{ selected: boolean }>`
    display: flex;
    height: ${({ selected }) => (selected ? '100px' : '20px')};
    justify-content: center;
`;

export const MarkerIcon = styled(Icon)<{ width: number; height: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
`;

export const CircleMarker = styled.div<{ isMyLocation: boolean }>`
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid ${({ isMyLocation }) => (isMyLocation ? Color.blue : Color.black)};
    background-color: ${({ isMyLocation }) => (isMyLocation ? 'rgba(0, 143, 255, 0.8);' : Color.black)};
    border-radius: 50%;
`;

export const Name = styled.div<{ isMyLocation: boolean }>`
    position: absolute;
    overflow: hidden;
    max-width: 130px;
    padding: 0.5rem 0.75rem;
    border: 1px solid ${Color.grey[300]};
    background-color: ${Color.white};
    border-radius: 1.5rem;
    color: ${({ isMyLocation }) => (isMyLocation ? Color.blue : Color.black)};
    font-size: 0.75rem;
    text-align: center;
    text-overflow: ellipsis;
    transform: translateY(-110%);
    white-space: nowrap;
`;
