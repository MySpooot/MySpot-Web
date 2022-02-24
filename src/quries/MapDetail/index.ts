import { useQuery, UseQueryOptions } from 'react-query';

import { getMapDetail, GetMapDetailResponse } from 'src/api/map';

export const useMapDetailQuery = (mapId: number, options?: UseQueryOptions<GetMapDetailResponse>) => {
    return useQuery<GetMapDetailResponse>(['mapDetail', mapId], () => getMapDetail({ mapId }), {
        ...options
    });
};
