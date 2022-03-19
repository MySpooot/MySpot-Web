import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Path } from 'src/Constants';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { useMapDetailState } from 'src/atoms/mapDetail';
import { getPrivateCode } from 'src/api/map';
import Icon from 'src/components/Icon';

import icShare from 'src/assets/mymap/ic_share.svg';
import icLock from 'src/assets/mymap/ic_lock.svg';

const Setting: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();

    const [privateCode, setPrivateCode] = useState<string>();

    const { mapDetail } = useMapDetailState();

    useEffect(() => {
        if (!mapDetail?.isPrivate) return;

        getPrivateCode({ mapId: Number(mapId) }).then(({ code }) => setPrivateCode(code));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(`${Path.myMap}/${mapId}`)}>
                <div>지도 상세 설정</div>
            </HeaderWithLeftArrow>
            <CopyToClipboard
                text={`${window.location.origin}${Path.myMap}/${mapId}${privateCode ? `?code=${privateCode}` : ''}`}
                onCopy={() => alert('복사 성공')}
            >
                <div
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid lightgrey', padding: '1rem 0.5rem' }}
                >
                    <Icon src={icShare} style={{ width: '1.625rem', height: '1.625rem' }} />
                    <div>링크 공유하기</div>
                </div>
            </CopyToClipboard>
            {privateCode && (
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => alert(privateCode)}>
                    <Icon src={icLock} style={{ width: '1.625rem', height: '1.625rem' }} />
                    <div>초대코드 보기</div>
                </div>
            )}
        </div>
    );
};

export default Setting;
