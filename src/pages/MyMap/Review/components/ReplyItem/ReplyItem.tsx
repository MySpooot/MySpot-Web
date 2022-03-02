import React, { FC, useState, useCallback, useRef } from 'react';
import { useMutation } from 'react-query';

import { Container, Top, Nickname, Created, Content, TextArea, ButtonArea, OwnerButton } from './styles';
import { updateReply, deleteReply, UpdateReplyParam, UpdateReplyBody } from 'src/api';
import { useMarkerRepliesState, useMeState } from 'src/atoms';
import { MarkerReplyVO } from 'src/vo';

type ReplyItemProps = {
    reply: MarkerReplyVO;
};

const ReplyItem: FC<ReplyItemProps> = ({ reply }) => {
    const { me } = useMeState();
    const { setMarkerReplies } = useMarkerRepliesState();

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
            }
        }
    );

    const { mutate: mutateDeleteReply } = useMutation(deleteReply, {
        onMutate: ({ replyId }) => {
            setMarkerReplies(replies => {
                if (!replies) return;

                return replies.filter(reply => reply.id !== replyId);
            });
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

    const newlineToBr = (text?: string) => {
        if (!text) {
            return '';
        }

        return text.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                <br />
            </span>
        ));
    };

    return (
        <Container>
            <Top>
                <Nickname>{reply.nickName}</Nickname>
                <Created>{reply.created}</Created>
            </Top>
            {isModifiyMode ? (
                <TextArea ref={textAreaRef} rows={3} value={modifyReviewText} onChange={event => setModifyReviewText(event.target.value)} />
            ) : (
                <Content>{newlineToBr(reply.message)}</Content>
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
