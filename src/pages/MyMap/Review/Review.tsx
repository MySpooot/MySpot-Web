import React, { FC, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import dayjs from 'dayjs';

import {
    Container,
    Main,
    Info,
    PlaceName,
    Address,
    RoadAddressArea,
    AddressLabel,
    RoadAddress,
    TextArea,
    RegisterButton,
    Line,
    ReviewArea,
    Top,
    ReviewTitle,
    ReviewCount,
    ReviewList,
    Footer,
    BackButton,
    ViewKakaoButton
} from './styles';
import { ReplyItem } from './components';
import { Path } from 'src/Constants';
import { useMapMarkerState, useMarkerRepliesState } from 'src/atoms';
import { MapMarkerVO, MarkerReplyVO } from 'src/vo';
import { getReplies, createReply } from 'src/api';
import Icon from 'src/components/Icon';

import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';

const Review: FC = () => {
    const { mapId, kakaoAddressId } = useParams<{ mapId: string; kakaoAddressId: string }>();
    const navigate = useNavigate();

    const { markers } = useMapMarkerState();
    const { markerReplies, setMarkerReplies } = useMarkerRepliesState();

    const [place, setplace] = useState<MapMarkerVO>();
    const [textAreaValue, setTextAreaValue] = useState('');

    useQuery(['getReplies', place?.id], () => getReplies({ markerId: Number(place?.id) }), {
        enabled: !!place,
        onSuccess: response => {
            setMarkerReplies(response.map(reply => MarkerReplyVO.from(reply)));
        }
    });
    const { mutate: mutateCreateReply } = useMutation(createReply, {
        onSuccess: ({ id, created, message, userId, userNickName }) => {
            setMarkerReplies(replies => {
                if (!replies) return;

                return [{ id, created: dayjs(created).format('YY.MM.DD'), message, userId, nickName: userNickName }, ...replies];
            });
        }
    });

    useEffect(() => {
        const place = markers?.find(marker => marker.kakaoAddressId === Number(kakaoAddressId));

        if (!place) {
            return navigate(Path.home);
        }

        setplace(place);
    }, [markers]); // eslint-disable-line react-hooks/exhaustive-deps

    const onRegisterClick = useCallback(() => {
        mutateCreateReply({ mapId: Number(mapId), markerId: Number(place?.id), message: textAreaValue });
    }, [mutateCreateReply, mapId, place, textAreaValue]);

    const onBackButtonClick = useCallback(() => {
        navigate(`/map/${mapId}`);
    }, [navigate, mapId]);

    const onViewKakaoMapButtonClick = useCallback(() => {
        navigate(`/map/${mapId}/kakao/${kakaoAddressId}`);
    }, [navigate, mapId, kakaoAddressId]);

    if (!place) {
        return <></>;
    }

    return (
        <Container>
            <Main>
                <Info>
                    <PlaceName>{place.name}</PlaceName>
                    <Address>{place.address}</Address>
                    <RoadAddressArea>
                        <AddressLabel>지번</AddressLabel>
                        <RoadAddress>{place.roadAddress}</RoadAddress>
                    </RoadAddressArea>
                    <TextArea
                        placeholder='후기를 작성해 보세요.'
                        rows={3}
                        value={textAreaValue}
                        onChange={evt => setTextAreaValue(evt.target.value)}
                    />
                    <RegisterButton active={0 < textAreaValue.length} onClick={onRegisterClick}>
                        등록하기
                    </RegisterButton>
                </Info>
                <Line />
                <ReviewArea>
                    <Top>
                        <ReviewTitle>후기</ReviewTitle>
                        <ReviewCount>{markerReplies?.length}개</ReviewCount>
                    </Top>
                    <ReviewList>
                        {markerReplies?.map(reply => (
                            <ReplyItem key={reply.id} reply={reply} />
                        ))}
                    </ReviewList>
                </ReviewArea>
            </Main>

            <Footer>
                <BackButton onClick={onBackButtonClick}>
                    <Icon src={icArrowLeft} />
                </BackButton>
                <ViewKakaoButton onClick={onViewKakaoMapButtonClick}>카카오 맵 보기</ViewKakaoButton>
            </Footer>
        </Container>
    );
};

export default Review;
