import React, { FC, useCallback, Dispatch, SetStateAction } from 'react';

import { Container, PlaceItem } from './styles';

interface SearchPlacesModalProps {
    places: { place_name: string }[];
    setSearchPlacesModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchPlacesModal: FC<SearchPlacesModalProps> = ({ places, setSearchPlacesModalOpen }) => {
    const onCloseClick = useCallback(() => {
        setSearchPlacesModalOpen(false);
    }, [setSearchPlacesModalOpen]);

    const onPlaceClick = useCallback((place: string) => {
        alert(place);
    }, []);

    return (
        <Container>
            <div onClick={onCloseClick}>X</div>
            {places.map((place, index) => (
                <PlaceItem key={index} onClick={() => onPlaceClick(place.place_name)}>
                    {place.place_name}
                </PlaceItem>
            ))}
        </Container>
    );
};

export default SearchPlacesModal;
