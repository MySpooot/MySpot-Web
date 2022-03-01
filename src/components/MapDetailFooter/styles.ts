import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.footer`
    display: flex;
    flex-direction: column;
    padding-top: 0.625rem;
    box-shadow: 0 -5px 10px 0 rgba(0, 0, 0, 0.1);
`;

export const Top = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid ${Color.grey[200]};
`;

export const LikeArea = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    .count {
        color: ${Color.grey[600]};
        font-size: 0.5rem;
        margin-left: 0.25rem;
    }
`;

export const LikeIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
`;

export const BookmarkIcon = styled(Icon)`
    margin-left: 1.25rem;
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
`;

export const Bottom = styled.div`
    display: flex;
    padding: 0.625rem 1rem 1.25rem;
`;

export const BackButton = styled.button`
    border: 1px solid ${Color.grey[300]};
    border-radius: 0.25rem;
    cursor: pointer;
    padding: 0.75rem;
`;

export const BackIcon = styled(Icon)`
    width: 2.25rem;
    height: 2.25rem;
`;

export const ViewButton = styled.button`
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid ${Color.blue};
    margin-left: 0.625rem;
    border-radius: 0.25rem;
    color: ${Color.blue};
    cursor: pointer;
    font-weight: 500;
    line-height: 2;
`;
