import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.button<{ up: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: ${({ up }) => (up ? '12rem' : '3rem')};
    left: 1rem;
    display: flex;
    width: 8.5rem;
    box-sizing: border-box;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.875rem;
    border: 1px solid ${Color.grey[200]};
    background-color: ${Color.white};
    border-radius: 2.75rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

export const ButtonText = styled.div`
    font-size: 1.125rem;
    font-weight: 400;
`;

export const ListIcon = styled(Icon)`
    width: 1.875rem;
    height: 1.875rem;
`;
