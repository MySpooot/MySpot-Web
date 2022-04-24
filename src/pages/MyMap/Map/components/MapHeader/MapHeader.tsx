import React, { FC, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { Title, RightArea, HeaderIcon, Tooltip, TooltipDescription, TooltipButton } from './styles';
import { Path } from 'src/Constants';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';

import icSearch from 'src/assets/mymap/ic_search.svg';

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

                {showTooltip && openToolTip && (
                    <Tooltip>
                        <h3>이용 Tip</h3>
                        <TooltipDescription>
                            저장되어 있는 장소가 없어요!
                            <br />
                            검색으로 나만의 장소를 추가해 보세요.
                        </TooltipDescription>

                        <TooltipButton onClick={() => setOpenToolTip(false)}>확인</TooltipButton>
                    </Tooltip>
                )}
            </RightArea>
        </HeaderWithLeftArrow>
    );
};

export default MapHeader;
