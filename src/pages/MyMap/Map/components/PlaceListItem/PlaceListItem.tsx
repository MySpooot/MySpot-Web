import React, { FC, useCallback, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import {
    Container,
    LeftArea,
    BookmarkIcon,
    CenterArea,
    AddressName,
    JibunAddress,
    RoadAddressWrapper,
    RoadAddressLabel,
    RoadAddress,
    RightArea,
    DeleteButton,
    ButtonArea,
    ButtonWrapper
} from './styles';
import { Path } from 'src/Constants';
import { MapMarkerVO } from 'src/vo';
import useMarkerUserAction from 'src/hooks/useMarkerUserAction';
import { useMapDetailState, useMapMarkerState } from 'src/atoms';
import { deleteMarker } from 'src/api';
import Icon from 'src/components/Icon';

import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';
// import icLike from 'src/assets/mymap/ic_marked_bookmark.svg';
import icLikeOff from 'src/assets/mymap/ic_like_off.svg';
import icComment from 'src/assets/mymap/ic_comment.svg';

type PlaceListItemProps = {
    place: MapMarkerVO;
};

const PlaceListItem: FC<PlaceListItemProps> = ({ place }) => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();

    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction();
    const { mapDetail } = useMapDetailState();
    const { setMarkers } = useMapMarkerState();

    const { mutate: fetchDeleteMarker } = useMutation(deleteMarker, {
        onSuccess: () => {
            setMarkers(markers => {
                if (!markers) return;

                return markers.filter(marker => marker.id !== place.id);
            });
        }
    });

    const onBookmarkClick = useCallback(
        (event: MouseEvent<HTMLImageElement>) => {
            event.stopPropagation();

            onBookmarkClick_(place);
        },
        [place, onBookmarkClick_]
    );

    const onPlaceClick = useCallback(() => {
        navigate(`${Path.myMap}/${mapId}/kakao/${place.kakaoAddressId}`);
    }, [navigate, mapId, place]);

    const onLikeClick = useCallback(() => {
        onLikeClick_(place);
    }, [onLikeClick_, place]);

    const onCommentClick = useCallback(() => {
        navigate(`${Path.myMap}/${mapId}/review/${place.kakaoAddressId}`);
    }, [navigate, mapId, place]);

    const onDeleteClick = useCallback(() => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        fetchDeleteMarker({ markerId: place.id });
    }, [fetchDeleteMarker, place]);

    return (
        <Container>
            <LeftArea>
                <BookmarkIcon alt='bookmark' src={place.isMyLocation ? icMarkedBookmark : icBookmark} onClick={event => onBookmarkClick(event)} />
            </LeftArea>
            <CenterArea onClick={onPlaceClick}>
                <AddressName>{place.name}</AddressName>
                <div>
                    <div className='adress'>
                        {place.address && <JibunAddress>{place.address}</JibunAddress>}
                        {place.roadAddress && (
                            <RoadAddressWrapper>
                                <RoadAddressLabel>지번</RoadAddressLabel>
                                <RoadAddress>{place.roadAddress}</RoadAddress>
                            </RoadAddressWrapper>
                        )}
                    </div>
                </div>
            </CenterArea>
            <RightArea>
                {mapDetail?.isOwner && <DeleteButton onClick={onDeleteClick}>삭제</DeleteButton>}
                <ButtonArea>
                    <ButtonWrapper onClick={onLikeClick}>
                        <Icon alt='like' src={place.isLike ? '' : icLikeOff} />
                        <span>{place.likeCount}</span>
                    </ButtonWrapper>
                    <ButtonWrapper onClick={onCommentClick}>
                        <Icon alt='comment' src={icComment} />
                        <span>{place.replyCount}</span>
                    </ButtonWrapper>
                </ButtonArea>
            </RightArea>
        </Container>
    );
};

export default PlaceListItem;
