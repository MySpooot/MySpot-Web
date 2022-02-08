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
    border-radius: 4px;
    border: solid 1px #e8e8e8;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    margin-bottom: 10px;
`;

export const CardText = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 64px;
    justify-content: center;
    cursor: pointer;
    .map-title {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: 0.1px;
        color: #333;
    }
    .create-date {
        font-size: 11px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.27;
        letter-spacing: 0.08px;
        color: #7f7f7f;
        margin: 2px;
    }
`;

export const FloatingWrapper = styled.div<{ active: boolean }>`
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    width: 181px;
    height: 48px;
    border-radius: 4px;
    box-shadow: 0 1px 5px 0 #d3d3d3;
    background-color: #fff;
`;

// const active = false;

export const UpdateMap = styled.div<{ active: boolean }>`
    position: relative;
    display: block;

    .vertical-circle {
        background-image: url(${circles});
        width: 22px;
        height: 22px;
        cursor: pointer;
        .see-more {
            visibility: ${props => (props.active ? 'hidden' : 'visible')};
            width: 181px;
            height: 48px;
            border-radius: 4px;
            box-shadow: 0 1px 5px 0 #d3d3d3;
            background-color: #fff;

            position: absolute;
            right: 0;
            bottom: -50px;
            z-index: 1;

            display: flex;
            align-items: center;
        }
    }
`;

export const MapBtn = styled.div`
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: 0.11px;
    color: #000;
    display: flex;
    width: 50%;
    justify-content: center;
    align-items: center;
    height: fit-content;

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
