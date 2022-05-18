import React, { FC, useMemo } from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

import icMarker from 'src/assets/mymap/ic_marker.svg';
import icMarkedMarker from 'src/assets/mymap/ic_marked_marker.svg';

type MarkerProps = {
    isMyLocation: boolean;
    selected: boolean;
    width: number;
    height: number;
    latitude: number;
    longitude: number;
    onClick: () => void;
};

const Marker: FC<MarkerProps> = ({ isMyLocation, selected, width, height, latitude, longitude, onClick }) => {
    const markerImage = useMemo(() => {
        if (isMyLocation) {
            return selected ? '' : icMarkedMarker;
        }

        return selected ? '' : icMarker;
    }, [isMyLocation, selected]);

    return (
        <MapMarker
            image={{
                src: markerImage,
                size: { width, height },
                options: { alt: 'marker' }
            }}
            position={{ lat: latitude, lng: longitude }}
            onClick={onClick}
        />
    );
};

export default Marker;
