import React, { FC, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Popup } from 'reactjs-popup';
import dayjs from 'dayjs';

import { Card, MapBtn, UpdateMap, CardText, VerticalDivider, SeeMore } from 'src/components/MapCard/styles';
import { Path } from 'src/Constants';
import { deleteMap, getPrivateCode } from 'src/api/map';
import Icon from 'src/components/Icon';

import share from 'src/assets/main/ic-share.svg';
import remove from 'src/assets/main/ic-remove.svg';
import circles from 'src/assets/main/ic-vertical-circle.svg';

interface MapCardProps {
    map: { id: number; mapName: string; isPrivate: boolean; created?: number };
    refetch: any;
}

const MapCard: FC<MapCardProps> = ({ map }) => {
    const navigate = useNavigate();

    const [privateCode, setPrivateCode] = useState<string>();

    const onClickItem = () => {
        navigate(`${Path.myMap}/${map.id}`);
    };

    const deleteItem = useCallback(async (mapId: number) => {
        const deleteCheck = confirm('지도를 삭제하시겠습니까?');

        if (deleteCheck) {
            await deleteMap(mapId);
            alert('지도가 삭제되었습니다.');
            //getmap다시 호출
        }
    }, []);

    useEffect(() => {
        getPrivateCode({ mapId: map.id }).then(({ code }) => setPrivateCode(code));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const dateFilter = date => {
        return dayjs(date).format('YYYY-MM-DD');
    };

    return (
        <Card>
            <CardText onClick={onClickItem}>
                <span className='map-title'>{map.mapName}</span>
                <span className='create-date'>{dateFilter(map.created)}</span>
            </CardText>
            <UpdateMap>
                <Popup
                    on='click'
                    position='bottom right'
                    trigger={<Icon alt='더보기' className='vertical-circle' src={circles} />}
                    closeOnDocumentClick
                >
                    {close => (
                        <SeeMore>
                            <CopyToClipboard
                                text={`${window.location.origin}${window.location.pathname}`}
                                onCopy={() => alert(`복사 성공 : ${privateCode}`)}
                            >
                                <MapBtn>
                                    <Icon alt='공유' className='ic-share' src={share} />
                                    공유
                                </MapBtn>
                            </CopyToClipboard>
                            <VerticalDivider></VerticalDivider>
                            <MapBtn
                                onClick={() => {
                                    deleteItem(map.id);
                                    close();
                                }}
                            >
                                <Icon alt='삭제' className='ic-remove' src={remove} />
                                삭제
                            </MapBtn>
                        </SeeMore>
                    )}
                </Popup>
            </UpdateMap>
        </Card>
    );
};

export default MapCard;
