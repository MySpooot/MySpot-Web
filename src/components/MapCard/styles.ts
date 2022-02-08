import styled from '@emotion/styled';
import circles from 'src/assets/main/ic-vertical-circle.svg';
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    border-top: 1px solid black;
    cursor: pointer;

    :last-child {
        border-bottom: 1px solid black;
    }
`;
export const Card = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: solid 1px #e8e8e8;
    margin-bottom: 10px;
    border-radius: 4px;
`;

export const CardText = styled.div`
    display: flex;
    width: 100%;
    height: 64px;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;

    .map-title {
        color: #333;
        font-size: 14px;
        font-stretch: normal;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.1px;
        line-height: 1.14;
    }

    .create-date {
        margin: 2px;
        color: #7f7f7f;
        font-size: 11px;
        font-stretch: normal;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.08px;
        line-height: 1.27;
    }
`;

export const FloatingWrapper = styled.div<{ active: boolean }>`
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    width: 181px;
    height: 48px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 5px 0 #d3d3d3;
`;

// const active = false;

export const UpdateMap = styled.div<{ active: boolean }>`
    position: relative;
    display: block;

    .vertical-circle {
        width: 22px;
        height: 22px;
        background-image: url(${circles});
        cursor: pointer;

        .see-more {
            position: absolute;
            z-index: 1;
            right: 0;
            bottom: -50px;
            display: flex;
            width: 181px;
            height: 48px;
            align-items: center;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 5px 0 #d3d3d3;
            visibility: ${props => (props.active ? 'hidden' : 'visible')};
        }
    }
`;

export const MapBtn = styled.div`
    display: flex;
    width: 50%;
    height: fit-content;
    align-items: center;
    justify-content: center;
    color: #000;
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.11px;
    line-height: 1;

    img {
        margin-right: 10px;

        &.ic-share {
            width: 10px;
            height: 16px;
        }

        &.ic-remove {
            width: 16px;
            height: 20px;
        }
    }
`;
