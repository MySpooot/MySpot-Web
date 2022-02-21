import React, { FC, MouseEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Container, Wrapper, EqRightIcon, BookMarkIcon } from './styles';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';
import { useMapPlaceOverlayState } from 'src/atoms/mapPlaceOverlay';
import { queryClient } from '../../../../..';

import icEqRight from 'src/assets/mymap/ic_eq_right.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';
import { createMyLocation, deleteMyLocation } from 'src/api/marker';

type PlaceOverlayProps = {
    up: boolean;
};

const PlaceOverlay: FC<PlaceOverlayProps> = ({ up }) => {
    const { mapId } = useParams<{ mapId: string }>();
    const { setPlaceDetail } = usePlaceDetail();
    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();

    const { mutate: fetchCreateMyLocation, isLoading: isCreatMyLocationLoading } = useMutation(createMyLocation, {
        onMutate: () => {
            setMapPlaceOverlay(value => (value ? { ...value, isMyLocation: true } : undefined));
            queryClient.setQueryData<any>(['getMarkers', mapId], prev => {
                return prev.map(data => {
                    if (data.addressId === mapPlaceOverlay?.addressId) {
                        return { ...data, isMyLocation: true };
                    }
                    return data;
                });
            });
        }
    });
    const { mutate: fetchDeleteMyLocation, isLoading: isDeleteMyLocationLoading } = useMutation(deleteMyLocation, {
        onMutate: () => {
            setMapPlaceOverlay(value => (value ? { ...value, isMyLocation: false } : undefined));
            queryClient.setQueryData<any>(['getMarkers', mapId], prev => {
                return prev.map(data => {
                    if (data.addressId === mapPlaceOverlay?.addressId) {
                        return { ...data, isMyLocation: false };
                    }
                    return data;
                });
            });
        }
    });

    const onPlaceOverlayClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        setPlaceDetail({ placeId: mapPlaceOverlay.addressId });
    }, [setPlaceDetail, mapPlaceOverlay]);

    const onBookmarkClick = useCallback(
        (event: MouseEvent<HTMLImageElement>) => {
            event.stopPropagation();

            if (isCreatMyLocationLoading || isDeleteMyLocationLoading || !mapPlaceOverlay) return;

            if (mapPlaceOverlay.isMyLocation) {
                fetchDeleteMyLocation({ addressId: mapPlaceOverlay.addressId });
            } else {
                fetchCreateMyLocation({
                    addressId: mapPlaceOverlay.addressId,
                    locationName: mapPlaceOverlay.name,
                    address: mapPlaceOverlay.address,
                    roadAddress: mapPlaceOverlay.roadAddress
                });
            }
        },
        [mapPlaceOverlay, fetchCreateMyLocation, fetchDeleteMyLocation, isCreatMyLocationLoading, isDeleteMyLocationLoading]
    );

    if (!mapPlaceOverlay) {
        return <></>;
    }

    return (
        <Container up={up}>
            <Wrapper onClick={onPlaceOverlayClick}>
                <div className='title'>
                    <BookMarkIcon src={mapPlaceOverlay.isMyLocation ? icMarkedBookmark : icBookmark} onClick={onBookmarkClick} />
                    <div style={{ display: 'flex' }}>
                        <div>{mapPlaceOverlay.name}</div>
                        <EqRightIcon src={icEqRight} />
                    </div>
                </div>
                <div className='address'>{mapPlaceOverlay.address}</div>
                {mapPlaceOverlay.roadAddress && (
                    <div className='road-address'>
                        <div className='label'>지번</div>
                        <div className='name'>{mapPlaceOverlay.roadAddress}</div>
                    </div>
                )}
            </Wrapper>
        </Container>
    );
};

export default PlaceOverlay;
