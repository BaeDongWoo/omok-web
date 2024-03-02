import { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { RoomHeaderprops } from '../waiting/room/RoomHeader';
import { useNavigate } from 'react-router-dom';
import { fireStore } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

interface ModalProps extends RoomHeaderprops {
  setIsModal: Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ setIsModal, roomList, setRoomList }: ModalProps) => {
  const nav = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [pwd, setPwd] = useState('');
  const [title, setTitle] = useState('');
  const addRoom = async () => {
    const roomId = new Date().getTime();
    const roomInfo = {
      roomTitle: title,
      checked: isChecked,
      pwd: pwd,
      roomId: roomId,
      users: [],
      game: { startGame: false, turn: 0 },
      board: [],
      nickname: [],
      ready: [false, false],
    };
    try {
      const q = doc(fireStore, 'rooms', roomId.toString());
      await setDoc(q, roomInfo);
      setIsModal(false);
      nav(`/room/${roomInfo.roomId}/${roomInfo.roomTitle}`);
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setIsModal(false);
  };
  return (
    <Container>
      <Title>
        <h3>방 만들기</h3>
      </Title>
      <InputBox>
        <input
          placeholder="방 제목을 입력해 주세요"
          onChange={(e: any) => setTitle(e.target.value)}
        ></input>
      </InputBox>
      <PwdBox>
        <div>
          <input
            type="password"
            readOnly={!isChecked}
            onChange={(e: any) => setPwd(e.target.value)}
          ></input>
          <input
            type="checkbox"
            onClick={(e: any) => setIsChecked(e.target.checked)}
          ></input>
          <span>비밀번호 설정</span>
        </div>
      </PwdBox>
      <BtnBox>
        <button id="close" onClick={closeModal}>
          닫기
        </button>
        <button id="make" onClick={addRoom}>
          만들기
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
const PwdBox = styled.div`
  display: flex;
  justify-content: center;
  div {
    width: 90%;
    input[type='password'] {
      width: 50%;
      height: 30px;
      border: 3px solid #00aaaa;
      border-radius: 10px;
    }
    span {
      color: #00aaaa;
    }
  }
`;
const BtnBox = styled.div`
  height: 15%;
  button {
    border: none;
    width: 50%;
    height: 100%;
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
export default Modal;
