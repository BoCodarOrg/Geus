import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;

  input{
    padding: 10px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  textarea{
    padding: 10px;
    height: 200px;
    resize: none;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-family: 'Raleway', sans-serif;
    outline: none;
  }
  label{
    margin-bottom: 5px;
    font-weight: bold;
  }

  button.link{
      background: transparent;
      border: 1px solid blue;
      color: blue;
      padding: 10px;
      border-radius: 10px;
      outline: none;
      cursor: pointer;

  }
  button.success{
      background: transparent;
      border: 1px solid green;
      color: green;
      padding: 10px;
      border-radius: 10px;
      outline: none;
  }

  button:disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: not-allowed;
  }

  h1.inline {
      display: inline-block;
  }

  h1.tiny{
    font-weight: 300;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 10px 0;
`;
