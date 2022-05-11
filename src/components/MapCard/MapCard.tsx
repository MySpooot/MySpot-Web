import React, { FC, useState, useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
    map: { id: number; mapName: string; isPrivate: boolean; created?: number; mapId?: number };
    onClick: () => void;
}

const MapCard: FC<MapCardProps> = ({ map, onClick }) => {
    const [privateCode, setPrivateCode] = useState<string>();

    const client = useQueryClient();

    const { mutate } = useMutation(() => getPrivateCode({ mapId: map.id }), {
        onSuccess: response => {
            setPrivateCode(response.code);
        }
    });

    const onPopupClick = useCallback(() => {
        if (!map.isPrivate) return;

        mutate();
    }, [map, mutate]);

    const onCopyClick = useCallback(() => {
        if (map.isPrivate && !privateCode) return alert('프라이빗 코드 에러');
        else return alert('복사성공');
    }, [map, privateCode]);

    const onDeleteCardClick = useCallback(async (mapId: number, close: () => void) => {
        const deleteCheck = confirm('지도를 삭제하시겠습니까?');

        if (deleteCheck) {
            await deleteMap(mapId);
            client.setQueryData<any>('getMaps', data => {
                return data.filter(map => map.id !== mapId);
            });
            alert('지도가 삭제되었습니다.');
            close();
        }
    }, []);

    const dateFilter = useCallback(date => {
        return dayjs(date).format('YYYY.MM.DD');
    }, []);

    return (
        <Card>
            <CardText onClick={onClick}>
                <span className='map-title'>{map.mapName}</span>
                <span className='create-date'>{dateFilter(map.created)}</span>
            </CardText>
            <UpdateMap>
                <Popup
                    on='click'
                    position='bottom right'
                    trigger={<Icon alt='더보기' className='vertical-circle' src={circles} />}
                    closeOnDocumentClick
                    onOpen={onPopupClick}
                >
                    {close => (
                        <SeeMore>
                            <CopyToClipboard
                                text={`${window.location.origin}${Path.myMap}/${map.id}${map.isPrivate ? `?code=${privateCode}` : ''}`}
                                onCopy={onCopyClick}
                            >
                                <MapBtn>
                                    <Icon alt='공유' className='ic-share' src={share} />
                                    공유
                                </MapBtn>
                            </CopyToClipboard>
                            <VerticalDivider />
                            <MapBtn onClick={() => onDeleteCardClick(map.id, close)}>
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
