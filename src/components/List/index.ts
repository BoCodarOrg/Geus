import styled from "styled-components";

const List = styled.ul`
    list-style: none;
    button{
            background: transparent;
            border: 1px solid blue;
            padding: 5px;
            border-radius: 10px;    
            outline: 0;
            cursor: pointer;
            color: blue;
    }
    h1{
            font-size: 25px;
    }
    div:first-child{
        display: flex;
        flex-direction: row;
       

        div{
            display: flex;
            flex:1;
            flex-direction: column;

            .language {
                background-color: blue;
                padding: 5px;
                color: white;
            }
        }
        
    }
    li{
        padding: 10px;
        font-size: 25px;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        transform: scale(0.98);
        transition: 0.1s ease-in all;
        p{
            margin: 0;
        }

        p:last-child{
            font-size: 15px;
        }

        &:last-child{
            border: none;
        }

        .inline {
            display: inline-block;
        }
        .gray {
            color: gray;
        }
        .bold {
            font-weight: bold;
        }

    }
`;
export default List;