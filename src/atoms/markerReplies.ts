import { atom, useAtom } from 'jotai';

import { MarkerReplyVO } from 'src/vo';

const markerRepliesState = atom<MarkerReplyVO[]>([]);

export const useMarkerRepliesState = () => {
    const [markerReplies, setMarkerReplies] = useAtom(markerRepliesState);

    return { markerReplies, setMarkerReplies };
};
