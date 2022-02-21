import React, { FC, MouseEvent, useCallback } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import {
    Container,
    PlaceListItem,
    BookmarkIcon,
    LeftArea,
    CenterArea,
    RightArea,
    AddressName,
    RoadAddress,
    JibunAddress,
    DeleteButton,
    ButtonArea
} from './styles';
import { createMyLocation, deleteMyLocation } from 'src/api/marker';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';
import Icon from 'src/components/Icon';
import { useMapPlaceOverlayState } from 'src/atoms/mapPlaceOverlay';
import { queryClient } from '../../../../..';

import icArrowUp from 'src/assets/mymap/ic_arrow_up.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';

type BottomFloatingAreaProps = {
    open: boolean;
    onPlaceListToggle: () => void;
};

const BottomFloatingArea: FC<BottomFloatingAreaProps> = ({ open, onPlaceListToggle }) => {
    const { mapId } = useParams<{ mapId: string }>();

    const { setPlaceDetail } = usePlaceDetail();
    const { setMapPlaceOverlay } = useMapPlaceOverlayState();

    const { data: markers } = useQuery<any>(['getMarkers', mapId]);

    const { mutate: fetchCreateMyLocation, isLoading: isCreatMyLocationLoading } = useMutation(createMyLocation, {
        onMutate: ({ addressId }) => {
            setMapPlaceOverlay(value => (value ? { ...value, isMyLocation: true } : undefined));
            queryClient.setQueryData<any>(['getMarkers', mapId], prev => {
                return prev.map(data => {
                    if (data.addressId === addressId) {
                        return { ...data, isMyLocation: true };
                    }
                    return data;
                });
            });
        }
    });
    const { mutate: fetchDeleteMyLocation, isLoading: isDeleteMyLocationLoading } = useMutation(deleteMyLocation, {
        onMutate: ({ addressId }) => {
            setMapPlaceOverlay(value => (value ? { ...value, isMyLocation: false } : undefined));
            queryClient.setQueryData<any>(['getMarkers', mapId], prev => {
                return prev.map(data => {
                    if (data.addressId === addressId) {
                        return { ...data, isMyLocation: false };
                    }
                    return data;
                });
            });
        }
    });

    const onPlaceClick = useCallback(
        (addressId: number) => {
            setPlaceDetail({ placeId: addressId });
        },
        [setPlaceDetail]
    );

    const onBookmarkClick = useCallback(
        (event: MouseEvent<HTMLImageElement>, place: any) => {
            event.stopPropagation();

            if (isCreatMyLocationLoading || isDeleteMyLocationLoading) return;

            if (place.isMyLocation) {
                fetchDeleteMyLocation({ addressId: place.addressId });
            } else {
                fetchCreateMyLocation({
                    addressId: place.addressId,
                    locationName: place.name,
                    address: place.address,
                    roadAddress: place.roadAddress
                });
            }
        },
        [isCreatMyLocationLoading, isDeleteMyLocationLoading, fetchDeleteMyLocation, fetchCreateMyLocation]
    );

    const onLikeClick = useCallback(() => {
        console.log('onLikeClick');
    }, []);

    const onCommentClick = useCallback(() => {
        console.log('onCommentClick');
    }, []);

    return (
        <Container isOpen={open}>
            <div className='header' onClick={onPlaceListToggle}>
                <Icon alt='arrowUp' className='arrow-up' src={icArrowUp} />
                <div className='text'>총 {markers?.length}개의 장소</div>
            </div>
            <ul className='place-list'>
                {markers?.map(marker => (
                    <PlaceListItem key={marker.id} onClick={() => onPlaceClick(marker.addressId)}>
                        <LeftArea>
                            <BookmarkIcon
                                alt='bookmark'
                                src={marker.isMyLocation ? icMarkedBookmark : icBookmark}
                                onClick={event => onBookmarkClick(event, marker)}
                            />
                        </LeftArea>
                        <CenterArea>
                            <AddressName>{marker.name}</AddressName>
                            <div>
                                <div className='adress'>
                                    {marker.address && <JibunAddress>{marker.address}</JibunAddress>}
                                    {marker.roadAddress && <RoadAddress>{marker.roadAddress}</RoadAddress>}
                                </div>
                            </div>
                        </CenterArea>
                        <RightArea>
                            <DeleteButton>삭제</DeleteButton>
                            <ButtonArea>
                                <div onClick={onLikeClick}>
                                    <Icon alt='like' src={icArrowUp} />
                                    <span>{marker.likeCount}</span>
                                </div>
                                <div onClick={onCommentClick}>
                                    <Icon alt='comment' src={icArrowUp} />
                                    <span>0</span>
                                </div>
                            </ButtonArea>
                        </RightArea>
                    </PlaceListItem>
                ))}
            </ul>
        </Container>
    );
};

export default BottomFloatingArea;
