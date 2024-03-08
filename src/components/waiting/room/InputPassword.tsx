import { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
interface InputPasswordProps {
  setIsPassword: Dispatch<React.SetStateAction<boolean>>;
  roomId: number;
  title: string;
  pwd: string;
}
const InputPassword = ({
  setIsPassword,
  roomId,
  title,
  pwd,
}: InputPasswordProps) => {
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const enterRoom = () => {
    if (pwd === password) {
      nav(`/room/${roomId}/${title}`);
    } else {
      setPassword('');
      alert('비밀번호가 올바르지 않습니다.');
    }
  };
  return (
    <Container>
      <Title>
        <h3>비밀번호 입력</h3>
      </Title>
      <InputBox>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e: any) => setPassword(e.target.value)}
        ></input>
      </InputBox>
      <BtnBox>
        <button id="close" onClick={() => setIsPassword(false)}>
          닫기
        </button>
        <button id="enter" onClick={enterRoom}>
          입력
        </button>
      </BtnBox>
    </Container>
  );
};
const Container = styled.div`
  width: 500px;
  height: 300px;
  background-color: #e8f0fe;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  width: 100%;
  height: 15%;
  text-align: center;
  background-color: #019696;
  color: #fff;
  h3 {
    line-height: 45px;
    margin: 0;
  }
`;
const InputBox = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 90%;
    height: 30px;
    border: 3px solid #00aaaa;
    border-radius: 10px;
  }
`;
const BtnBox = styled.div`
  height: 15%;
  button {
    border: none;
    width: 50%;
    height: 100%;
  }
  button {
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background-color: #00aaaa;
    &:hover {
      background-color: #019696;
    }
  }
  #close {
    border-top: 1px solid #00aaaa;
    background-color: #e8f0fe;
    color: #00aaaa;
    &:hover {
      background-color: #d5e0f1;
    }
  }
`;
export default InputPassword;
