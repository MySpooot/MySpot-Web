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
    border-bottom: #e8e8e8 solid 1px;
    padding: 0 16px;
    .tab {
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1;
        letter-spacing: 0.11px;
        padding-right: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
    }
`;

export const Maps = styled.div`
    height: 100vh;
    padding: 16px;
`;
