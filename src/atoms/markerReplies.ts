import { atom, useRecoilState } from 'recoil';

import { MarkerReplyVO } from 'src/vo';

const markerRepliesState = atom<MarkerReplyVO[] | undefined>({
    key: 'markerRepliesState',
    default: undefined
});

export const useMarkerRepliesState = () => {
    const [markerReplies, setMarkerReplies] = useRecoilState(markerRepliesState);

    return { markerReplies, setMarkerReplies };
};
