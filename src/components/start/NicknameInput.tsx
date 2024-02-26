import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const NicknameInput = () => {
  const nav = useNavigate();
  const [nickname, setNickname] = useState<string>('');
  const enterHandler = () => {
    sessionStorage.setItem('nickname', nickname);
    nav('/waiting');
  };
  return (
    <Container>
      <input
        type="text"
        placeholder="닉네임을 입력하세요!"
        onChange={(e: any) => setNickname(e.target.value)}
      ></input>
      <button type="button" onClick={enterHandler}>
        들어가기
      </button>
    </Container>
  );
};
const Container = styled.div`
  width: 70vw;
  max-width: 700px;
  height: 60px;
  position: relative;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 3px solid #00aaaa;
  background-color: #e8f0fe;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    border: none;
    outline: none;
    box-shadow: none;
    font-weight: bold;
    font-size: 25px;
    width: 80%;
    background-color: #e8f0fe;
    &::placeholder {
      color: #d2d2d2;
    }
  }
  button {
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    position: absolute;
    right: 0;
    color: #fff;
    background-color: #00aaaa;
    height: 50px;
    width: 20%;
    border-radius: 10px;
    &:hover {
      background-color: #019696;
    }
  }
`;

export default NicknameInput;