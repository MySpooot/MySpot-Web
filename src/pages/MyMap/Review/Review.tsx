import React, { FC, useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfiniteQuery, useMutation } from 'react-query';

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
    NoReview
} from './styles';
import { ReplyItem } from './components';
import { Path } from 'src/Constants';
import { useMapMarkerState, useMarkerRepliesState, useMeState } from 'src/atoms';
import { MapMarkerVO, MarkerReplyVO } from 'src/vo';
import { getReplies, createReply, CreateReplyParam, CreateReplyBody, CreateReplyResponse } from 'src/api';
import useIntersectionObserver from 'src/hooks/useIntersectionObserver';
import MapDetailFooter from 'src/components/MapDetailFooter/MapDetailFooter';
import Loading from 'src/components/Loading';

const Review: FC = () => {
    const { mapId, kakaoAddressId } = useParams<{ mapId: string; kakaoAddressId: string }>();
    const navigate = useNavigate();

    const { me } = useMeState();
    const { markers } = useMapMarkerState();
    const { markerReplies, setMarkerReplies } = useMarkerRepliesState();

    const [place, setPlace] = useState<MapMarkerVO>();
    const [textAreaValue, setTextAreaValue] = useState('');
    const [replyOffset, setReplyOffset] = useState(0);

    const { fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['getReplies', place?.id],
        ({ pageParam }) => getReplies({ markerId: Number(place?.id) }, { offset: pageParam?.offset ?? 0 }),
        {
            enabled: !!place,
            onSuccess: ({ pages }) => {
                setMarkerReplies(pages.flatMap(replyList => replyList.map(reply => MarkerReplyVO.from(reply))));
                setReplyOffset(offset => offset + 10);
            }
        }
    );

    const { mutate: mutateCreateReply } = useMutation<CreateReplyResponse, unknown, CreateReplyParam & CreateReplyBody>(
        ({ markerId, message }) => createReply({ markerId }, { message }),
        {
            onSuccess: response => {
                setMarkerReplies(replies => {
                    if (!replies) return;

                    return [MarkerReplyVO.from(response), ...replies];
                });
                setPlace(place => {
                    if (!place) return;

                    return { ...place, replyCount: place.replyCount + 1 };
                });
            }
        }
    );

    const { setRef } = useIntersectionObserver({
        callback: entries => {
            if (
                entries[0].isIntersecting &&
                !isFetchingNextPage &&
                (markerReplies?.length || 0) < (place?.replyCount ?? 0) &&
                replyOffset < (place?.replyCount ?? 0)
            ) {
                fetchNextPage({ pageParam: { offset: replyOffset } });
            }
        }
    });

    useEffect(() => {
        const place = markers?.find(marker => marker.kakaoAddressId === Number(kakaoAddressId));

        if (!place) {
            return navigate(Path.home);
        }

        setPlace(place);
    }, [markers]); // eslint-disable-line react-hooks/exhaustive-deps

    const onRegisterClick = useCallback(() => {
        if (textAreaValue.length > 64) {
            return alert('64자');
        }

        mutateCreateReply({ markerId: Number(place?.id), message: textAreaValue });
        setTextAreaValue('');
    }, [mutateCreateReply, place, textAreaValue]);

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
                        disabled={!me}
                        placeholder={me ? '후기를 작성해 보세요.' : '로그인한 유저만 후기를 작성할 수 있습니다.'}
                        rows={3}
                        value={textAreaValue}
                        onChange={event => setTextAreaValue(event.target.value)}
                    />
                    <RegisterButton active={0 < textAreaValue.length} onClick={onRegisterClick}>
                        등록하기
                    </RegisterButton>
                </Info>
                <Line />
                <ReviewArea>
                    <Top>
                        <ReviewTitle>후기</ReviewTitle>
                        <ReviewCount>{place.replyCount}개</ReviewCount>
                    </Top>
                    <ReviewList>
                        {!markerReplies ? (
                            <Loading />
                        ) : markerReplies.length === 0 ? (
                            <NoReview>후기가 없습니다.</NoReview>
                        ) : (
                            markerReplies.map(reply => <ReplyItem key={reply.id} reply={reply} />)
                        )}
                    </ReviewList>
                    <div ref={setRef} />
                    {isFetchingNextPage && <Loading />}
                </ReviewArea>
            </Main>

            <MapDetailFooter
                marker={place}
                viewButton={{ text: '카카오 맵 보기', onClick: () => navigate(`${Path.myMap}/${mapId}/kakao/${kakaoAddressId}`) }}
            />
        </Container>
    );
};

export default Review;
