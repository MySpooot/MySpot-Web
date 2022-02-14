import styled from '@emotion/styled';

import { Palette } from 'src/Constants';

// export const Container = styled.div`
//     display: flex;
//     justify-content: space-between;
//     padding: 1.5rem;
//     border-top: 0.0625rem solid black;
//     cursor: pointer;

//     :last-child {
//         border-bottom: 0.0625rem solid black;
//     }
// `;
export const Card = styled.div`
    height: 3.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem;
    margin-bottom: 0.625rem;
    border: solid 0.0625rem ${Palette.Grey[300]};
    border-radius: 0.25rem;
`;

export const CardText = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    .map-title {
        color: ${Palette.Grey[900]};
        font-size: 0.875rem;
        line-height: 1.14;
    }

    .create-date {
        margin: 0.125rem;
        color: #7f7f7f;
        font-size: 0.6875rem;
        line-height: 1.27;
    }
`;

export const UpdateMap = styled.div<{ active: boolean }>`
    position: relative;
    display: block;

    .vertical-circle: {
        width: 1.375rem;
        height: 1.375rem;
        cursor: pointer;
    }
    .see-more {
        position: absolute;
        z-index: 1;
        right: 0;
        bottom: -3.125rem;
        display: flex;
        width: 11.25rem;
        height: 3rem;
        align-items: center;
        background-color: #fff;
        border-radius: 0.25rem;
        box-shadow: 0 1px 5px 0 #d3d3d3;
        visibility: ${props => (props.active ? 'hidden' : 'visible')};
    }
`;

export const MapBtn = styled.div`
    display: flex;
    width: 50%;
    height: fit-content;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 1rem;
    letter-spacing: 0.006875rem;
    line-height: 1;

    img {
        margin-right: 0.625rem;

        &.ic-share {
            width: 0.625rem;
            height: 1rem;
        }

        &.ic-remove {
            width: 1rem;
            height: 1.25rem;
        }
    }
`;
