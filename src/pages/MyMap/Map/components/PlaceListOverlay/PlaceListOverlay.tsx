import React, { FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Wrapper, Top, Total, CloseIcon, PlaceList } from './styles';
import { getMarkersHelper } from 'src/query';
import { PlaceListItem } from 'src/pages/MyMap/Map/components';

import icClose from 'src/assets/mymap/ic_close.svg';

type PlaceListOverlayProps = {
    close: () => void;
};

const PlaceListOverlay: FC<PlaceListOverlayProps> = ({ close }) => {
    const { mapId } = useParams<{ mapId: string }>();
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

    const ref = useRef<HTMLDivElement>(null);

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
