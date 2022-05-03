import { PostMarkerLikeParam, DeleteMarkerLikeParam } from '@myspooot/myspot-backend';

import { request } from 'src/api';

export const createMarkerLike = ({ markerId }: PostMarkerLikeParam) => {
    return request({ method: 'POST', url: `/map/marker/${markerId}/like` });
};

export const deleteMarkerLike = ({ markerId }: DeleteMarkerLikeParam) => {
    return request({ method: 'DELETE', url: `/map/marker/${markerId}/like` });
};
