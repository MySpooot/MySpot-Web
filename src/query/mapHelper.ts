import { makeQueryHelper } from 'react-query-helper';

import { getMapDetail, getMarkers } from 'src/api';
import { queryClient } from 'src/query';
import { MapDetailVO, MapMarkerVO } from 'src/vo';

export const getMapDetailHelper = makeQueryHelper({
    baseQueryKey: ['getMapDetail'],
    queryClient,
    queryFn: () => (mapId: number) =>
        getMapDetail({ mapId }).then(response => {
            if (!response) return;

            return MapDetailVO.from(response);
        })
});

export const getMarkersHelper = makeQueryHelper({
    baseQueryKey: ['getMarkers'],
    queryClient,
    queryFn: () => (mapId: number) =>
        getMarkers({ mapId }).then(response => {
            if (!response) return;

            return response.map(MapMarkerVO.from);
        })
});
