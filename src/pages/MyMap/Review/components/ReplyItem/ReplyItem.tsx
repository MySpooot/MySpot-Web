import React, { FC, useState, useCallback, useRef } from 'react';
import { useParams } from 'react-router';

import { useMutation } from 'react-query';

import { Container, Top, Nickname, Created, Content, TextArea, ButtonArea, OwnerButton } from './styles';
import { updateReply, deleteReply, UpdateReplyParam, UpdateReplyBody } from 'src/api';
import { useMapMarkerState, useMarkerRepliesState, useMeState } from 'src/atoms';
import { MarkerReplyVO } from 'src/vo';

type ReplyItemProps = {
    reply: MarkerReplyVO;
};

const ReplyItem: FC<ReplyItemProps> = ({ reply }) => {
    const { kakaoAddressId } = useParams<{ kakaoAddressId: string }>();

    const { me } = useMeState();
    const { setMarkerReplies } = useMarkerRepliesState();
    const { setMarkers } = useMapMarkerState();

    const [isModifiyMode, setIsModifiyMode] = useState(false);
    const [modifyReviewText, setModifyReviewText] = useState(reply.message);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const { mutate: mutateUpdateReply } = useMutation<unknown, unknown, UpdateReplyParam & UpdateReplyBody>(
        ({ replyId, message }) => updateReply({ replyId }, { message }),
        {
            onMutate: ({ replyId, message }) => {
                setMarkerReplies(replies => {
                    if (!replies) return;

                    return replies.map(reply => {
                        if (reply.id === replyId) {
                            return { ...reply, message };
                        }

                        return reply;
                    });
                });
            },
            onError: error => {
                // TODO: 실패시 롤백
                console.error(error);
            }
        }
    );

    const { mutate: mutateDeleteReply } = useMutation(deleteReply, {
        onMutate: ({ replyId }) => {
            setMarkers(markers => {
                if (!markers) return;

                return markers.map(marker => {
                    if (marker.kakaoAddressId === Number(kakaoAddressId)) {
                        return { ...marker, replyCount: marker.replyCount - 1 };
                    }
                    return marker;
                });
            });
            setMarkerReplies(replies => {
                if (!replies) return;

                return replies.filter(reply => reply.id !== replyId);
            });
        },
        onError: error => {
            // TODO: 실패시 롤백
            console.error(error);
        }
    });

    const onModifyModeChangeClick = useCallback((flag: boolean) => {
        if (flag) {
            setIsModifiyMode(flag);
            setTimeout(() => {
                textAreaRef.current?.focus();
                textAreaRef.current?.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length);
            }, 100);
            return;
        }

        setIsModifiyMode(flag);
    }, []);

    const onModifyClick = useCallback(
        (replyId: number, message: string) => {
            mutateUpdateReply({ replyId, message });
            setIsModifiyMode(false);
        },
        [mutateUpdateReply]
    );

    const onDeleteClick = useCallback(
        (replyId: number) => {
            mutateDeleteReply({ replyId });
        },
        [mutateDeleteReply]
    );

    return (
        <Container>
            <Top>
                <Nickname>{reply.nickName}</Nickname>
                <Created>{reply.created}</Created>
            </Top>
            {isModifiyMode ? (
                <TextArea ref={textAreaRef} rows={3} value={modifyReviewText} onChange={event => setModifyReviewText(event.target.value)} />
            ) : (
                <Content>
                    {reply.message.split('\n').map((value, index) => (
                        <span key={index}>
                            {value}
                            <br />
                        </span>
                    ))}
                </Content>
            )}
            {me?.id === reply.userId && (
                <ButtonArea>
                    {isModifiyMode ? (
                        <>
                            <OwnerButton onClick={() => onModifyClick(reply.id, modifyReviewText)}>저장</OwnerButton>
                            <OwnerButton onClick={() => onModifyModeChangeClick(false)}>취소</OwnerButton>
                        </>
                    ) : (
                        <>
                            <OwnerButton onClick={() => onModifyModeChangeClick(true)}>수정</OwnerButton>
                            <OwnerButton onClick={() => onDeleteClick(reply.id)}>삭제</OwnerButton>
                        </>
                    )}
                </ButtonArea>
            )}
        </Container>
    );
};

export default ReplyItem;
