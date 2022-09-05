import React, { FC, useState, useCallback, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Top, Nickname, Created, Content, TextArea, ButtonArea, OwnerButton, MoreTextLabel } from './styles';
import { useMeState } from 'src/atoms';
import useAlert from 'src/hooks/useAlert';
import useReplyItem from 'src/hooks/useReplyItem';
import { MarkerReplyVO } from 'src/vo';

type ReplyItemProps = {
    reply: MarkerReplyVO;
};

const ReplyItem: FC<ReplyItemProps> = ({ reply }) => {
    const { mapId, kakaoAddressId } = useParams<{ mapId: string; kakaoAddressId: string }>();

    const { me } = useMeState();
    const { mutateUpdateReply, mutateDeleteReply } = useReplyItem(mapId, kakaoAddressId);

    const { confirm } = useAlert();

    const [isModifiyMode, setIsModifiyMode] = useState(false);
    const [modifyReviewText, setModifyReviewText] = useState(reply.message);
    const [showMoreText, setShowMoreText] = useState(false);
    const [tempItemHeight, setTempItemHeight] = useState(0);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const replyRef = useRef<HTMLDivElement>(null);

    const isShowMoreButton = useMemo(() => tempItemHeight > 80, [tempItemHeight]);

    const onModifyModeChangeClick = useCallback((flag: boolean) => {
        setIsModifiyMode(flag);

        if (flag) {
            setTimeout(() => {
                textAreaRef.current?.focus();
                textAreaRef.current?.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length);
            }, 100);
        }
    }, []);

    const onModifyClick = useCallback(
        (replyId: number, message: string) => {
            mutateUpdateReply({ replyId, message });
            setIsModifiyMode(false);
        },
        [mutateUpdateReply]
    );

    const onDeleteClick = useCallback(
        async (replyId: number) => {
            const flag = await confirm('후기를 정말 삭제하시나요?');

            if (!flag) return;

            mutateDeleteReply({ replyId });
        },
        [confirm, mutateDeleteReply]
    );

    const onMoreTextLabelClick = useCallback(() => {
        setTempItemHeight(replyRef.current?.clientHeight ?? 0);

        setShowMoreText(value => !value);
    }, []);

    return (
        <Container data-testid='replyItem'>
            <Top>
                <Nickname data-testid='replyItemNickname'>{reply.nickName}</Nickname>
                <Created>{reply.created}</Created>
            </Top>
            {isModifiyMode ? (
                <TextArea ref={textAreaRef} rows={5} value={modifyReviewText} onChange={event => setModifyReviewText(event.target.value)} />
            ) : (
                <>
                    <Content ref={replyRef} data-testid='replyItemContent' hide={showMoreText}>
                        {reply.message.split('\n').map((value, index) => (
                            <span key={index}>
                                {value}
                                <br />
                            </span>
                        ))}
                    </Content>
                    {((replyRef.current?.clientHeight ?? 0) > 80 || isShowMoreButton) && (
                        <MoreTextLabel onClick={onMoreTextLabelClick}>{showMoreText ? '접기' : '더보기'}</MoreTextLabel>
                    )}
                </>
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
