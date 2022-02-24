import styled from '@emotion/styled';

import { ScrollbarStyle } from 'src/Constants';
import Icon from 'src/components/Icon';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    flex-grow: 1;
`;

export const PlaceInput = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    border: 1px solid #d3d3d3;
    margin-right: 1rem;
    border-radius: 0.25rem;

    input {
        flex-grow: 1;
        padding: 0.5rem 0.875rem;
        border: none;
        outline: none;
    }

    .search {
        cursor: pointer;
    }
`;

export const Main = styled.main`
    ${ScrollbarStyle}
    flex-grow: 1;
    overflow-y: auto;
`;

export const PlaceItem = styled.div`
    display: flex;
    align-items: center;
    padding: 1.25rem 1rem;
    border-bottom: 1px solid #f5f5f5;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

export const PlaceName = styled.h3`
    font-weight: 500;
`;

export const Address = styled.div`
    margin-top: 0.25rem;
    color: #7f7f7f;
    font-size: 0.75rem;
`;

export const RoadAddress = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.25rem;
    font-size: 0.75rem;

    .label {
        padding: 0.125rem;
        border: 1px solid #e8e8e8;
        margin-right: 0.25rem;
        border-radius: 0.25rem;
        color: #bebebe;
    }
`;

export const AddButton = styled.button`
    padding: 0.5rem 0.75rem;
    background-color: #f5f5f5;
    border-radius: 0.25rem;
    color: #7f7f7f;
    cursor: pointer;
`;

export const HeaderIcon = styled(Icon)`
    width: 1.5rem;
    height: 1.5rem;
    margin: 0 0.5rem;
    cursor: pointer;
`;
