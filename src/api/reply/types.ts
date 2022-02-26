export type GetRepliesQuery = {
    markerId: number;
    offset?: number;
    limit?: number;
};

export type GetRepliesResponse = {
    id: number;
    created: number;
    userId: number;
    userNickName: string;
    mapId: number;
    markerId: number;
    message: string;
};

export type CreateReplyBody = {
    message: string;
    mapId: number;
    markerId: number;
};

export type CreateReplyResponse = {
    id: number;
    created: number;
    message: string;
    userId: number;
    mapId: number;
    markerId: number;
    userNickName: string;
};

export type UpdateReplyParam = {
    replyId: number;
};

export type UpdateReplyBody = {
    message: string;
};

export type DeleteReplyParam = {
    replyId: number;
};
