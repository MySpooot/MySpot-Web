import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    width: 50px;
    height: 100px;
`;

export const MarkerIcon = styled(Icon)<{ width: number; height: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
`;

export const Name = styled.div`
    position: absolute;
    right: -50%;
    left: -50%;
    overflow: hidden;
    padding: 0.5rem;
    background-color: ${Color.white};
    border-radius: 0.25rem;
    font-size: 0.75rem;
    text-align: center;
    text-overflow: ellipsis;
    transform: translateY(-110%);
    white-space: nowrap;
`;
