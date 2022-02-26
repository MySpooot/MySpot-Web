import { request } from 'src/api';
import type {
    GetRepliesQuery,
    GetRepliesResponse,
    CreateReplyBody,
    CreateReplyResponse,
    UpdateReplyParam,
    UpdateReplyBody,
    DeleteReplyParam
} from './types';

export const getReplies = (query: GetRepliesQuery) => {
    return request<GetRepliesResponse[]>({ method: 'GET', url: '/map/marker/replies', params: query });
};

export const createReply = (body: CreateReplyBody) => {
    return request<CreateReplyResponse>({ method: 'POST', url: '/map/marker/replies', data: body });
};

export const updateReply = ({ replyId }: UpdateReplyParam, body: UpdateReplyBody) => {
    return request({ method: 'PUT', url: `/map/marker/replies/${replyId}`, data: body });
};

export const deleteReply = ({ replyId }: DeleteReplyParam) => {
    return request({ method: 'DELETE', url: `/map/marker/replies/${replyId}` });
};
