import styled from '@emotion/styled';

import { Color } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    position: absolute;
    z-index: 11;
    bottom: 1.875rem;
    width: 100%;
    cursor: pointer;
    transition: bottom 0.5s;
`;

export const Wrapper = styled.div`
    display: flex;
    width: calc(100% - 2rem);
    height: 9.625rem;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 1.25rem;
    margin: 0 1rem;
    background-color: ${Color.white};
    border-radius: 0.625rem;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);

    .title {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-weight: 500;
    }
`;

export const PlaceName = styled.h3`
    font-size: 1.125rem;
    font-weight: 400;
    line-height: 1.375rem;
`;

export const BookMarkIcon = styled(Icon)`
    width: 1.375rem;
    height: 1.75rem;
    margin-right: 1.125rem;
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
    margin: 0.5rem 0;
    color: ${Color.grey[600]};
    font-size: 1rem;
    line-height: 1.25rem;
`;

export const RoadAddress = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
    color: ${Color.grey[600]};
    font-size: 0.875rem;
    line-height: 1.125rem;

    .label {
        padding: 0 0.25rem;
        border: 1px solid ${Color.grey[300]};
        margin-right: 0.25rem;
        border-radius: 0.25rem;
        font-size: 0.6875rem;
        line-height: 130%;
    }
`;

export const ButtonArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

export const ActiveSpan = styled.span<{ active?: boolean }>`
    margin-left: 0.375rem;
    color: ${({ active }) => (active ? Color.blue : Color.grey[600])};
    font-size: 0.875rem;
    font-weight: 400;
`;
