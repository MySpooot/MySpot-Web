import { useState, useCallback } from 'react';

import useAlert from 'src/hooks/useAlert';

export type Place = {
    id: number;
    locationName: string;
    longitude: string;
    latitude: string;
    addressId: number;
    address: string;
    roadAddress?: string;
};

const useSearchPlace = () => {
    const { alert } = useAlert();

    const [places, setPlaces] = useState<Place[]>();

    const searchPlaces = useCallback(
        (keyword: string) => {
            const ps = new window.kakao.maps.services.Places();

            // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
            ps.keywordSearch(keyword, async (places: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setPlaces(
                        places.map(place => ({
                            locationName: place.place_name,
                            longitude: place.x,
                            latitude: place.y,
                            addressId: place.id,
                            address: place.address_name,
                            roadAddress: place.road_address_name
                        }))
                    );
                } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
                    await alert('검색 결과가 존재하지 않습니다.');
                    return;
                } else if (status === window.kakao.maps.services.Status.ERROR) {
                    await alert('검색 결과 중 오류가 발생했습니다.');
                    return;
                }
            });
        },
        [alert]
    );

    return { searchPlaces, places };
};

export default useSearchPlace;
