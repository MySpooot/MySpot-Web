import React, { FC, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { Title, RightArea, HeaderIcon, Tooltip } from './styles';
import { Path } from 'src/Constants';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';

import icSearch from 'src/assets/mymap/ic_search.svg';
import icSetting from 'src/assets/mymap/ic_setting.svg';

type MapHeaderProps = {
    mapName: string;
    showTooltip: boolean;
};

const MapHeader: FC<MapHeaderProps> = ({ mapName, showTooltip }) => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    const [openToolTip, setOpenToolTip] = useState(true);

    return (
        <HeaderWithLeftArrow style={{ justifyContent: 'space-between' }} onLeftArrowClick={() => navigate(Path.home)}>
            <Title>{mapName}</Title>
            <RightArea>
                <Link to={`${Path.myMap}/${mapId}${Path.search}`}>
                    <HeaderIcon alt='search' src={icSearch} />
                </Link>
                <Link to={`${Path.myMap}/${mapId}/setting`}>
                    <HeaderIcon alt='setting' src={icSetting} style={{ marginLeft: '0.5rem' }} />
                </Link>
                {showTooltip && openToolTip && (
                    <Tooltip onClick={() => setOpenToolTip(false)}>
                        <h3>이용 Tip</h3>
                        <div>저장되어 있는 장소가 없어요!</div>
                        <div>나만의 장소를 추가해 보세요.</div>
                    </Tooltip>
                )}
            </RightArea>
        </HeaderWithLeftArrow>
    );
};

export default MapHeader;
