import styled, { css } from "styled-components";

interface IPropsCircleStatus {
    status?: number
}

const Reviewers = styled.div`
    background: #efefefef;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    cursor: pointer;
    p{
        padding: 5px;
    }
`;
const ContainerReviewer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;
const IconReviewer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content:center;
    align-items: center;
    color: white;
    font-weight: bold;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background: blue;
    margin-right: 10px;
    cursor: pointer;
`;

const Status = styled.div<IPropsCircleStatus>`
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    ${props => {
        if (props.status === 0) {
            return css`background-color: green;`;
        } else if (props.status === 1) {
            return css`background-color: blue ;`
        } else if (props.status === 2) {
            return css`background-color: red;`
        }
    }}
`;

const BoxContent = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
`;

export { Reviewers, IconReviewer, ContainerReviewer, Status, BoxContent };