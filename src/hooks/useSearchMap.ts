import { useState, useCallback } from 'react';

import { PlaceInfo } from 'types/placeInfo';

const useSearchMap = () => {
    const [places, setPlaces] = useState<PlaceInfo[]>();

    const placesSearchCB = useCallback((places: PlaceInfo[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
            setPlaces(places);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    }, []);

    const searchPlaces = useCallback(
        (keyword: string) => {
            const ps = new window.kakao.maps.services.Places();

            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, placesSearchCB);
        },
        [placesSearchCB]
    );

    return { searchPlaces, places };
};

export default useSearchMap;
