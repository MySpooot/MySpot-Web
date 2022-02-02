import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Path } from 'src/Constants';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { useMapDetailState } from 'src/atoms/mapDetail';
import { getPrivateCode } from 'src/api/map';

const Setting: FC = () => {
    const navigate = useNavigate();
    const params = useParams<{ mapId: string }>();

    const [privateCode, setPrivateCode] = useState<string>();

    const { mapDetail } = useMapDetailState();

    useEffect(() => {
        if (!mapDetail?.isPrivate) return;

        getPrivateCode({ mapId: Number(params.mapId) }).then(({ code }) => setPrivateCode(code));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(`${Path.myMap}/${params.mapId}`)}>
                <div>지도 상세 설정</div>
            </HeaderWithLeftArrow>
            <CopyToClipboard text={`${window.location.origin}${window.location.pathname}`} onCopy={() => alert('복사 성공')}>
                <div css={{ cursor: 'pointer' }}>링크 공유하기</div>
            </CopyToClipboard>
            {privateCode && (
                <div css={{ cursor: 'pointer' }} onClick={() => alert(privateCode)}>
                    초대코드 보기
                </div>
            )}
        </div>
    );
};

export default Setting;
