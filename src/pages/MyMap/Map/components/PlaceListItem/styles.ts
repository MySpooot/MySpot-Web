import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.li`
    display: flex;
    min-height: 9rem;
    max-height: 9rem;
    padding: 1.25rem 0;
    border-bottom: 0.375rem solid ${Color.grey[200]};
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
    margin-top: 0.25rem;
    color: #7f7f7f;
    font-size: 0.75rem;
`;

export const RoadAddressWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
`;

export const RoadAddressLabel = styled.div`
    padding: 0.125rem 0.25rem;
    border: 1px solid ${Color.grey[200]};
    margin-right: 0.25rem;
    border-radius: 0.25rem;
    color: ${Color.grey[400]};
    font-size: 0.625rem;
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
    justify-content: space-evenly;
    margin: 0 0.875rem;
`;

export const BookmarkIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
`;

export const DeleteButton = styled.button`
    width: fit-content;
    align-self: flex-end;
    padding: 0.125rem 0.25rem;
    border: 1px solid #e8e8e8;
    background-color: #ffffff;
    border-radius: 0.25rem;
    color: #9e9e9e;
    font-size: 0.75rem;
`;

export const ButtonArea = styled.div`
    display: flex;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 0.25rem;
        color: ${Color.grey[600]};
        font-size: 0.5rem;
    }

    :first-child {
        margin-right: 0.5rem;
    }
`;
