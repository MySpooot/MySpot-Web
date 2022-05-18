import React, { FC, useMemo } from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import { Container, MarkerIcon, Name } from './styles';

import icMarker from 'src/assets/mymap/ic_marker.svg';
import icMarkedMarker from 'src/assets/mymap/ic_marked_marker.svg';

type MarkerProps = {
    name: string;
    showName: boolean;
    isMyLocation: boolean;
    selected: boolean;
    width: number;
    height: number;
    latitude: number;
    longitude: number;
    onClick: () => void;
};

const Marker: FC<MarkerProps> = ({ name, showName, isMyLocation, selected, width, height, latitude, longitude, onClick }) => {
    const markerImage = useMemo(() => {
        // TODO: 선택된 이미지 받으면 추가하기
        if (isMyLocation) {
            return selected ? '' : icMarkedMarker;
        }

        return selected ? '' : icMarker;
    }, [isMyLocation, selected]);

    return (
        <CustomOverlayMap position={{ lat: latitude, lng: longitude }}>
            <Container onClick={onClick}>
                {showName && <Name>{name}</Name>}
                <MarkerIcon height={height} src={markerImage} width={width} />
            </Container>
        </CustomOverlayMap>
    );
};

export default Marker;
