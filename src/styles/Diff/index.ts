import styled, { css } from 'styled-components';


interface IPropsStatus {
    status?: number
}

const Title = styled.div`
    display: flex;
    flex-direction: column;
    p{
        display: inline-block;
        font-weight: bold;
        font-size: 30px;

        p{
            margin-left: 10px;
            font-weight: lighter;
        }
        p.gray {
            font-size: 40px;
        }
    }

    p:last-child{
        font-size: 15px;
    }
    .gray {
        color: #ccc;
    }
    .tiny {
        font-weight: lighter;
    }
`;

const Status = styled.div<IPropsStatus>`
    display: flex;
    justify-content:center;
    align-items:center;
    width: 150px;
    height: 25px;
    border-radius:30px;
    color: #fff;
    margin: 10px 0;
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

const BoxConversation = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 10px;
    border: 1px solid #ccc;
    div:first-child{
        flex:1;
        background: blue;
        color: #fff;
        padding: 10px;
        border-radius: 10px 10px 0 0; 
    }

    div{
        flex: 3;
        padding: 10px;

    }
`;

export { Title, Status, BoxConversation };
