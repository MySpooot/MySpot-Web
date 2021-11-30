export const drawMap = (latitude: number, longitude: number) => {
    const container = document.getElementById('map');

    const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3
    };

    const map = new window.kakao.maps.Map(container, options);

    return map;
};
