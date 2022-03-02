import React, { FC, MouseEvent, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Popup } from 'reactjs-popup';

import { Container, Wrapper, EqRightIcon, BookMarkIcon, VerticalThreeIcon, DeletePopup, Address, RoadAddress } from './styles';
import { useMapPlaceOverlayState } from 'src/atoms/mapPlaceOverlay';
import { useMapMarkerState } from 'src/atoms';
import { createMyLocation, deleteMyLocation, deleteMarker } from 'src/api/marker';

import icEqRight from 'src/assets/mymap/ic_eq_right.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';

import icDotThree from 'src/assets/main/ic-vertical-circle.svg';

const PlaceOverlay: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    const { setMarkers } = useMapMarkerState();
    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();

    const { mutate: fetchCreateMyLocation, isLoading: isCreatMyLocationLoading } = useMutation(createMyLocation, {
        onMutate: () => {
            setMapPlaceOverlay(value => (value ? { ...value, isMyLocation: true } : undefined));
            setMarkers(markers => {
                if (!markers) return undefined;

                return markers.map(marker => {
                    if (marker.kakaoAddressId === mapPlaceOverlay?.kakaoAddressId) {
                        return { ...marker, isMyLocation: true };
                    }

                    return marker;
                });
            });
        }
    });

    const { mutate: fetchDeleteMyLocation, isLoading: isDeleteMyLocationLoading } = useMutation(deleteMyLocation, {
        onMutate: () => {
            setMapPlaceOverlay(value => (value ? { ...value, isMyLocation: false } : undefined));
            setMarkers(markers => {
                if (!markers) return undefined;

                return markers.map(marker => {
                    if (marker.kakaoAddressId === mapPlaceOverlay?.kakaoAddressId) {
                        return { ...marker, isMyLocation: false };
                    }

                    return marker;
                });
            });
        }
    });

    const { mutate: fetchDeleteMarker } = useMutation(deleteMarker, {
        onMutate: () => {
            setMapPlaceOverlay(undefined);
            setMarkers(markers => {
                if (!markers) return undefined;

                return markers.filter(marker => marker.kakaoAddressId !== mapPlaceOverlay?.kakaoAddressId);
            });
        }
    });

    const onPlaceOverlayClick = useCallback(() => {
        navigate(`/map/${mapId}/kakao/${mapPlaceOverlay?.kakaoAddressId}`);
    }, [navigate, mapId, mapPlaceOverlay]);

    const onBookmarkClick = useCallback(
        (event: MouseEvent<HTMLImageElement>) => {
            event.stopPropagation();

            if (isCreatMyLocationLoading || isDeleteMyLocationLoading || !mapPlaceOverlay) return;

            if (mapPlaceOverlay.isMyLocation) {
                fetchDeleteMyLocation({ addressId: mapPlaceOverlay.kakaoAddressId });
            } else {
                fetchCreateMyLocation({
                    addressId: mapPlaceOverlay.kakaoAddressId,
                    locationName: mapPlaceOverlay.name,
                    address: mapPlaceOverlay.address,
                    roadAddress: mapPlaceOverlay.roadAddress
                });
            }
        },
        [mapPlaceOverlay, fetchCreateMyLocation, fetchDeleteMyLocation, isCreatMyLocationLoading, isDeleteMyLocationLoading]
    );

    const onDeleteClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        fetchDeleteMarker({ markerId: Number(mapPlaceOverlay.id) });
    }, [mapPlaceOverlay, fetchDeleteMarker]);

    if (!mapPlaceOverlay) {
        return <></>;
    }

    return (
        <Container>
            <Wrapper>
                <div className='title'>
                    <BookMarkIcon src={mapPlaceOverlay.isMyLocation ? icMarkedBookmark : icBookmark} onClick={onBookmarkClick} />
                    <div style={{ display: 'flex' }} onClick={onPlaceOverlayClick}>
                        <div>{mapPlaceOverlay.name}</div>
                        <EqRightIcon src={icEqRight} />
                    </div>
                    <Popup
                        on='click'
                        position='bottom right'
                        trigger={<VerticalThreeIcon src={icDotThree} onClick={(event: MouseEvent<HTMLImageElement>) => event.stopPropagation()} />}
                        closeOnDocumentClick
                    >
                        {() => <DeletePopup onClick={onDeleteClick}>삭제</DeletePopup>}
                    </Popup>
                </div>
                <Address>{mapPlaceOverlay.address}</Address>
                {mapPlaceOverlay.roadAddress && (
                    <RoadAddress>
                        <div className='label'>지번</div>
                        <div>{mapPlaceOverlay.roadAddress}</div>
                    </RoadAddress>
                )}
            </Wrapper>
        </Container>
    );
};

export default PlaceOverlay;
