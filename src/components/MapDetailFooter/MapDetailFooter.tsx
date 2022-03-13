import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Top, LikeArea, LikeIcon, BookmarkIcon, Bottom, BackButton, BackIcon, ViewButton } from './styles';
import { MapMarkerVO } from 'src/vo';
import { Path } from 'src/Constants';
import { useMeState } from 'src/atoms';
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

    const { me } = useMeState();
    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction();

    const onBookmarkClick = useCallback(() => {
        if (!me) return;

        onBookmarkClick_(marker);
    }, [me, onBookmarkClick_, marker]);

    const onLikeClick = useCallback(() => {
        if (!me) return;

        onLikeClick_(marker);
    }, [me, onLikeClick_, marker]);

    return (
        <Container>
            <Top>
                <LikeArea onClick={onLikeClick}>
                    {/* @TODO: 아이콘 추가 */}
                    <LikeIcon src={marker.isLike ? '' : icLikeOff} />
                    <div className='count'>{marker.likeCount}</div>
                </LikeArea>
                <BookmarkIcon src={marker.isMyLocation ? icMarkedBookmark : icBookmark} onClick={onBookmarkClick} />
            </Top>
            <Bottom>
                <BackButton onClick={() => navigate(`${Path.myMap}/${mapId}`)}>
                    <BackIcon src={icArrowLeft} />
                </BackButton>
                <ViewButton onClick={viewButton.onClick}>{viewButton.text}</ViewButton>
            </Bottom>
        </Container>
    );
};

export default MapDetailFooter;
