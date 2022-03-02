import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Top, LikeArea, LikeIcon, BookmarkIcon, Bottom, BackButton, BackIcon, ViewButton } from './styles';
import { MapMarkerVO } from 'src/vo';
import { Path } from 'src/Constants';
import useMarkerUserAction from 'src/hooks/useMarkerUserAction';

import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';
import icLikeOff from 'src/assets/mymap/ic_like_off.svg';

type MapDetailFooterProps = {
    marker: MapMarkerVO;
    viewButton: {
        text: string;
        onClick: () => void;
    };
};

const MapDetailFooter: FC<MapDetailFooterProps> = ({ marker, viewButton }) => {
    const { mapId } = useParams<{ mapId: string }>();
    const navigate = useNavigate();

    const { onBookmarkClick, onLikeClick } = useMarkerUserAction();

    const onBackButtonClick = useCallback(() => {
        navigate(`${Path.myMap}/${mapId}`);
    }, [navigate, mapId]);

    return (
        <Container>
            <Top>
                <LikeArea onClick={() => onLikeClick(marker)}>
                    {/* @TODO: 아이콘 추가 */}
                    <LikeIcon src={marker.isLike ? '' : icLikeOff} />
                    <div className='count'>{marker.likeCount}</div>
                </LikeArea>
                <BookmarkIcon src={marker.isMyLocation ? icMarkedBookmark : icBookmark} onClick={() => onBookmarkClick(marker)} />
            </Top>
            <Bottom>
                <BackButton onClick={onBackButtonClick}>
                    <BackIcon src={icArrowLeft} />
                </BackButton>
                <ViewButton onClick={viewButton.onClick}>{viewButton.text}</ViewButton>
            </Bottom>
        </Container>
    );
};

export default MapDetailFooter;
