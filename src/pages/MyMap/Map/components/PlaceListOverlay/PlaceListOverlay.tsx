import React, { FC, useRef, useEffect } from 'react';

import { Container, Wrapper, Top, Total, CloseIcon, PlaceList } from './styles';
import { useMapMarkerState } from 'src/atoms';
import { PlaceListItem } from 'src/pages/MyMap/Map/components';

import icClose from 'src/assets/mymap/ic_close.svg';

type PlaceListOverlayProps = {
    close: () => void;
};

const PlaceListOverlay: FC<PlaceListOverlayProps> = ({ close }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { markers } = useMapMarkerState();

    useEffect(() => {
        const handler = (event: MouseEvent) => {
            if (ref.current?.contains(event.target as Node)) return;

            close();
        };

        window.addEventListener('click', handler);

        return () => window.removeEventListener('click', handler);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!markers) {
        return <></>;
    }

    return (
        <Container>
            <Wrapper ref={ref}>
                <Top>
                    <Total>총 {markers.length}개</Total>
                    <CloseIcon src={icClose} onClick={close} />
                </Top>
                <PlaceList>
                    {markers.map(marker => (
                        <PlaceListItem key={marker.id} place={marker} />
                    ))}
                </PlaceList>
            </Wrapper>
        </Container>
    );
};

export default PlaceListOverlay;
