import styled from '@emotion/styled';

export const Container = styled.div`
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
`;

export const TitleTab = styled.div`
    display: flex;
    height: 46px;
    padding: 0 16px;
    border-bottom: #e8e8e8 solid 1px;

    .tab {
        display: flex;
        align-items: center;
        padding-right: 20px;
        cursor: pointer;
        font-size: 16px;
        font-stretch: normal;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.11px;
        line-height: 1;
    }
`;

export const Maps = styled.div`
    height: 100vh;
    padding: 16px;
`;
