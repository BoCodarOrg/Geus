import styled from "styled-components";

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

export  { Reviewers, IconReviewer, ContainerReviewer };