import React, { FC, MouseEvent, useCallback } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Popup } from 'reactjs-popup';

import {
    Container,
    Wrapper,
    PlaceName,
    BookMarkIcon,
    VerticalThreeIcon,
    DeletePopup,
    Address,
    RoadAddress,
    RoadAddressName,
    ButtonArea,
    ActiveSpan
} from './styles';
import { Path } from 'src/Constants';
import { deleteMarker } from 'src/api';
import { useMapPlaceOverlayState, useMeState } from 'src/atoms';
import Icon from 'src/components/Icon';
import useMarkerUserAction from 'src/hooks/useMarkerUserAction';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';
import { MapMarkerVO } from 'src/vo';

import icDotThree from 'src/assets/main/ic-vertical-circle.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icComment from 'src/assets/mymap/ic_comment.svg';
import icLikeOff from 'src/assets/mymap/ic_like_off.svg';
import icLikeOn from 'src/assets/mymap/ic_like_on.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';

const PlaceOverlay: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();

    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();

    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction(mapId);

    const { me } = useMeState();
    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));

    const { mutate: fetchDeleteMarker } = useMutation(deleteMarker, {
        onMutate: () => {
            setMapPlaceOverlay(undefined);
            getMarkersHelper.setQueryData(Number(mapId), markers => {
                if (!markers) return undefined;

                return markers.filter(marker => marker.kakaoAddressId !== mapPlaceOverlay?.kakaoAddressId);
            });
        },
        onError: error => {
            // TODO: 실패시 롤백
            console.error(error);
        }
    });

    const onPlaceOverlayClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        navigate(`/map/${mapId}/kakao/${mapPlaceOverlay.kakaoAddressId}`);
    }, [navigate, mapId, mapPlaceOverlay]);

    const onBookMarkClick = useCallback(
        (marker: MapMarkerVO) => {
            if (!me) return;

            setMapPlaceOverlay(value => {
                if (!value) return;

                return { ...value, isMyLocation: !marker.isMyLocation };
            });

            onBookmarkClick_(marker);
        },
        [me, onBookmarkClick_, setMapPlaceOverlay]
    );

    const onLikeClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        setMapPlaceOverlay(value => {
            if (!value) return;

            return { ...value, isLike: !value.isLike, likeCount: value.isLike ? value.likeCount - 1 : value.likeCount + 1 };
        });

        onLikeClick_(mapPlaceOverlay);
    }, [mapPlaceOverlay, setMapPlaceOverlay, onLikeClick_]);

    const onDeleteClick = useCallback(() => {
        if (!mapPlaceOverlay) return;

        fetchDeleteMarker({ markerId: mapPlaceOverlay.id });
    }, [mapPlaceOverlay, fetchDeleteMarker]);

    if (!mapPlaceOverlay) {
        return <></>;
    }

    return (
        <Container data-testid='placeOverlay' onClick={onPlaceOverlayClick}>
            <Wrapper>
                <div style={{ display: 'flex' }}>
                    <BookMarkIcon
                        src={mapPlaceOverlay.isMyLocation ? icMarkedBookmark : icBookmark}
                        onClick={event => {
                            event.stopPropagation();
                            onBookMarkClick(mapPlaceOverlay);
                        }}
                    />
                    <div style={{ flexGrow: 1 }}>
                        <div className='title'>
                            <PlaceName>{mapPlaceOverlay.name}</PlaceName>
                            {mapDetail?.isOwner && (
                                <Popup
                                    on='click'
                                    position='bottom right'
                                    trigger={
                                        <VerticalThreeIcon
                                            src={icDotThree}
                                            onClick={(event: MouseEvent<HTMLImageElement>) => event.stopPropagation()}
                                        />
                                    }
                                    closeOnDocumentClick
                                >
                                    {() => <DeletePopup onClick={onDeleteClick}>삭제</DeletePopup>}
                                </Popup>
                            )}
                        </div>
                        <Address data-testid='address'>{mapPlaceOverlay.address}</Address>
                        {mapPlaceOverlay.roadAddress && (
                            <RoadAddress>
                                <div className='label'>지번</div>
                                <RoadAddressName data-testid='roadAddress'>{mapPlaceOverlay.roadAddress}</RoadAddressName>
                            </RoadAddress>
                        )}
                    </div>
                </div>

                <ButtonArea>
                    <Icon
                        src={mapPlaceOverlay.isLike ? icLikeOn : icLikeOff}
                        style={{ cursor: 'pointer', width: '1.75rem', height: '1.75rem' }}
                        onClick={event => {
                            event.stopPropagation();
                            onLikeClick();
                        }}
                    />
                    <ActiveSpan active={mapPlaceOverlay.isLike} style={{ marginRight: '0.875rem' }}>
                        {mapPlaceOverlay.likeCount}
                    </ActiveSpan>
                    <Icon
                        src={icComment}
                        style={{ cursor: 'pointer', width: '1.75rem', height: '1.75rem' }}
                        onClick={event => {
                            event.stopPropagation();
                            navigate(`${Path.myMap}/${mapId}/review/${mapPlaceOverlay.kakaoAddressId}`);
                        }}
                    />
                    <ActiveSpan>{mapPlaceOverlay.replyCount}</ActiveSpan>
                </ButtonArea>
            </Wrapper>
        </Container>
    );
};

export default PlaceOverlay;
