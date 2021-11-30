import { type } from 'os';
import { useEffect, useState } from 'react';
import { PlaceInfo } from 'types/placeInfo';

const useSearchMap = () => {
    // useEffect

    const [data, setData] = useState<PlaceInfo[]>();
    const searchPlaces = (keyword: string) => {
        const ps = new window.kakao.maps.services.Places();

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch(keyword, placesSearchCB);
    };

    const placesSearchCB = (data: PlaceInfo[], status: string) => {
        if (status === window.kakao.maps.services.Status.OK) {
            console.log(data);
            setData(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert('검색 결과가 존재하지 않습니다.');
            return;
        } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
        }
    };

    return { searchPlaces, data };
};

export default useSearchMap;
