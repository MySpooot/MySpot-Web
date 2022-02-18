import React, { FC, useCallback } from 'react';
import { useQuery } from 'react-query';
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
    DeleteButton
} from './styles';
import { getMarkers } from 'src/api/marker';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';
import Icon from 'src/components/Icon';

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

    const { data: markers } = useQuery(['getMarkers', mapId], () => getMarkers({ mapId: Number(mapId) }));

    const onPlaceClick = useCallback(
        (place: any) => {
            setPlaceDetail({ placeId: place.addressId });
        },
        [setPlaceDetail]
    );

    const onBookmarkClick = useCallback(() => {
        console.log();
    }, []);

    return (
        <Container isOpen={open}>
            <div className='header' onClick={onPlaceListToggle}>
                <Icon alt='arrowUp' className='arrow-up' src={icArrowUp} />
                <div className='text'>총 {markers?.length}개의 장소</div>
            </div>
            <ul className='place-list'>
                {markers?.map(marker => (
                    <PlaceListItem key={marker.id} onClick={() => onPlaceClick(marker)}>
                        <LeftArea>
                            <BookmarkIcon alt='bookmark' src={marker.isMyLocation ? icMarkedBookmark : icBookmark} onClick={onBookmarkClick} />
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
                            <div style={{ display: 'flex' }}>
                                <div>L 11</div>
                                <div>C 0</div>
                            </div>
                        </RightArea>
                    </PlaceListItem>
                ))}
            </ul>
        </Container>
    );
};

export default BottomFloatingArea;
