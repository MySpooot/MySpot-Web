import React, { FC, useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router';

import { Card, MapBtn, UpdateMap, CardText, VerticalDivider } from 'src/components/MapCard/styles';
import { Path } from 'src/Constants';
import { deleteMap } from 'src/api/map';
import Icon from 'src/components/Icon';

import share from 'src/assets/main/ic-share.svg';
import remove from 'src/assets/main/ic-remove.svg';
import circles from 'src/assets/main/ic-vertical-circle.svg';

interface MapCardProps {
    map: { id: number; mapName: string; isPrivate: boolean; created?: number };
    setIsOpenToolTip: Dispatch<SetStateAction<boolean>>;
}

const MapCard: FC<MapCardProps> = ({ map, setIsOpenToolTip }) => {
    const navigate = useNavigate();

    const [showTooltip, setShowTooltip] = useState(true);

    const onClickItem = () => {
        navigate(`${Path.myMap}/${map.id}`);
    };

    const openTooltip = () => {
        setShowTooltip(!showTooltip);
        if (showTooltip) {
            setIsOpenToolTip(true);
        }
    };

    const deleteItem = useCallback(async (mapId: number) => {
        const deleteCheck = confirm('지도를 삭제하시겠습니까?');

        if (deleteCheck) {
            const result = await deleteMap(mapId);
            console.log(result);
            alert('지도가 삭제되었습니다.');
            //getmap다시 호출
        } else return;
    }, []);

    return (
        <Card>
            <CardText onClick={onClickItem}>
                <span className='map-title'>{map.mapName}</span>
                <span className='create-date'>{map.created}</span>
            </CardText>
            <UpdateMap active={showTooltip}>
                <Icon alt='더보기' className='vertical-circle' src={circles} onClick={openTooltip} />
                <div className='see-more'>
                    <MapBtn>
                        <Icon alt='공유' className='ic-share' src={share} />
                        공유
                    </MapBtn>
                    <VerticalDivider></VerticalDivider>
                    <MapBtn onClick={() => deleteItem(map.id)}>
                        <Icon alt='삭제' className='ic-remove' src={remove} />
                        삭제
                    </MapBtn>
                </div>
            </UpdateMap>
        </Card>
    );
};

export default MapCard;
