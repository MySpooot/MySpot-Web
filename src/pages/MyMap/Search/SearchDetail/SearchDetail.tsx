import React, { FC } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';

import { Container, Footer, ButtonText } from './styles';
import { Path } from 'src/Constants';
import Button from 'src/components/Button';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import { getMapDetailHelper } from 'src/query';

const SearchDetail: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    const { kakaoAddressId } = useParams<{ kakaoAddressId: string }>();

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));

    if (!kakaoAddressId) {
        return <></>;
    }

    if (!mapDetail?.isOwner) {
        return <Navigate to={`${Path.myMap}/${mapId}`} />;
    }

    return (
        <Container>
            <KakaoPlaceIframe addressId={kakaoAddressId} />
            <Footer>
                <Button rounded onClick={() => navigate(-1)}>
                    <ButtonText>뒤로가기</ButtonText>
                </Button>
            </Footer>
        </Container>
    );
};

export default SearchDetail;
