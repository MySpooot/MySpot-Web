import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Top, LikeArea, LikeIcon, BookmarkIcon, Bottom, BackIcon } from './styles';
import { MapMarkerVO } from 'src/vo';
import { Path } from 'src/Constants';
import { getMeHelper } from 'src/query';
import useMarkerUserAction from 'src/hooks/useMarkerUserAction';
import Button from 'src/components/Button';

import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';
import icLikeOn from 'src/assets/mymap/ic_like_on.svg';
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

    const { data: me } = getMeHelper.useQuery();
    const { onBookmarkClick: onBookmarkClick_, onLikeClick: onLikeClick_ } = useMarkerUserAction(mapId);

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
                    <LikeIcon src={marker.isLike ? icLikeOn : icLikeOff} />
                    <div className='count'>{marker.likeCount}</div>
                </LikeArea>
                <BookmarkIcon src={marker.isMyLocation ? icMarkedBookmark : icBookmark} onClick={onBookmarkClick} />
            </Top>
            <Bottom>
                <Button fullWidth={false} style={{ width: '3rem', marginRight: '0.625rem' }} onClick={() => navigate(`${Path.myMap}/${mapId}`)}>
                    <BackIcon src={icArrowLeft} />
                </Button>
                <Button type='bordered' onClick={viewButton.onClick}>
                    {viewButton.text}
                </Button>
            </Bottom>
        </Container>
    );
};

export default MapDetailFooter;
