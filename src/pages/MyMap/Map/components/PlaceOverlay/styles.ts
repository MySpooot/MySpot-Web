import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    position: absolute;
    z-index: 11;
    bottom: 1.875rem;
    width: 100%;
    transition: bottom 0.5s;
`;

export const Wrapper = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    height: 6.875rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    margin: 0 1rem;
    background-color: ${Color.white};
    border-radius: 0.375rem;

    .title {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
    }
`;

export const BookMarkIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.375rem;
`;

export const EqRightIcon = styled(Icon)`
    width: 1.125rem;
    height: 1.125rem;
`;

export const VerticalThreeIcon = styled(Icon)`
    width: 1.25rem;
    height: 1.25rem;
    margin-left: auto;
`;

export const DeletePopup = styled.div`
    padding: 0.5rem;
    border: 1px solid ${Color.grey[500]};
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 0.75rem;
`;

export const Address = styled.div`
    margin: 0.25rem 0;
    color: ${Color.grey[600]};
    font-size: 0.75rem;
`;

export const RoadAddress = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
    color: ${Color.grey[600]};
    font-size: 0.75rem;

    .label {
        padding: 0 0.25rem;
        border: 1px solid ${Color.grey[300]};
        margin-right: 0.25rem;
        border-radius: 0.25rem;
        line-height: 130%;
    }
`;
