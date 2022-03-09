import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.button<{ up: boolean }>`
    position: absolute;
    z-index: 11;
    bottom: ${({ up }) => (up ? '9.5rem' : '3rem')};
    left: 1rem;
    display: flex;
    align-items: center;
    padding: 0.375rem 0.5rem;
    border: 1px solid ${Color.grey[200]};
    background-color: ${Color.white};
    border-radius: 1rem;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;

export const ButtonText = styled.div`
    font-size: 0.875rem;
    font-weight: 500;
`;

export const ListIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
`;
