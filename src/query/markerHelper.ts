import { makeQueryHelper } from 'react-query-helper';

import { getMapDetail, getMarkers } from 'src/api';
import { MapDetailVO, MapMarkerVO } from 'src/vo';
import { queryClient } from 'src/query';

export const getMapDetailHelper = makeQueryHelper({
    baseQueryKey: ['getMapDetail'],
    queryClient,
    queryFn: () => (mapId: number) => getMapDetail({ mapId }).then(MapDetailVO.from)
});

export const getMarkersHelper = makeQueryHelper({
    baseQueryKey: ['getMarkers'],
    queryClient,
    queryFn: () => (mapId: number) => getMarkers({ mapId }).then(response => response.map(MapMarkerVO.from))
});
