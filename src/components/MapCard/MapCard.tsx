import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';

import { Card, MapBtn, UpdateMap } from './styles';
import { Path } from 'src/Constants';
import share from 'src/assets/main/ic-share.svg';
import remove from 'src/assets/main/ic-remove.svg';
interface MapCardProps {
    map: { id: number; mapName: string; isPrivate: boolean };
}

const MapCard: FC<MapCardProps> = ({ map }) => {
    const navigate = useNavigate();

    const [showTooltip, setShowTooltip] = useState(false);

    const onClickItem = () => {
        navigate(`${Path.myMap}/${map.id}`);
    };

    const openTooltip = () => {
        setShowTooltip(!showTooltip);
    };

    return (
        <Card>
            <div style={{ display: 'flex', flexDirection: 'column' }} onClick={onClickItem}>
                <span className='map-title'>{map.mapName}</span>
                <span className='create-date'>{map.mapName}</span>
            </div>
            <UpdateMap active={showTooltip}>
                <div className='vertical-circle' onClick={openTooltip}>
                    <span className='see-more'>
                        <MapBtn style={{ borderRightWidth: '1px', borderRightColor: '#e8e8e8', borderRightStyle: 'solid' }}>
                            <img className='ic-share' src={share}></img>공유
                        </MapBtn>

                        <MapBtn>
                            <img className='ic-remove' src={remove}></img>삭제
                        </MapBtn>
                    </span>
                </div>
            </UpdateMap>
        </Card>
    );
};

export default MapCard;
