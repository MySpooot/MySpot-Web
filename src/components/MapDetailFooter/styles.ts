import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.footer`
    position: relative;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
`;

export const Top = styled.div`
    position: absolute;
    top: 0.75rem;
    right: 1.25rem;
    display: flex;
    width: 8.0625rem;
    height: 2.75rem;
    justify-content: space-between;
    padding: 0.625rem 1.5rem;
    border: 1px solid ${Color.grey[300]};
    border-bottom: 1px solid ${Color.grey[200]};
    background-color: ${Color.white};
    border-radius: 2.25rem;
    transform: translateY(-100%);
`;

export const LikeArea = styled.div<{ on: boolean }>`
    display: flex;
    align-items: center;
    cursor: pointer;

    .count {
        margin-left: 0.375rem;
        color: ${({ on }) => (on ? Color.blue : Color.grey[600])};
        font-size: 0.875rem;
    }
`;

export const LikeIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
`;

export const BookmarkIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
`;

export const Bottom = styled.div`
    display: flex;
    padding: 1.25rem 1rem;
`;

export const BackIcon = styled(Icon)`
    width: 2.375rem;
    height: 2.375rem;
`;

export const RoundedBackButton = styled.button`
    width: 4.1875rem;
    height: 4.1875rem;
    padding: 0.875rem;
    border: 1px solid ${Color.grey[300]};
    border-radius: 2.25rem;
`;
export const RoundedViewButton = styled.button`
    flex-grow: 1;
    padding: 1rem;
    border: 1px solid ${Color.grey[300]};
    margin-left: 1rem;
    border-radius: 2.25rem;
    color: ${Color.blue};
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 2rem;
`;
