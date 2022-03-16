import styled from '@emotion/styled';

import Icon from 'src/components/Icon';

export const Container = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const MapContainer = styled.div`
    width: 100%;
    flex-grow: 1;
`;

export const Map = styled.div`
    width: 100%;
    height: 100%;
`;

export const FavoriteIcon = styled(Icon)`
    position: absolute;
    z-index: 11;
    top: 3.5rem;
    left: 0.5rem;
    width: 1.875rem;
    height: 1.875rem;
    cursor: pointer;
`;
