import { Dispatch, useRef, useState } from 'react';
import styled from 'styled-components';
import { RoomListProps } from './RoomList';
import { Roomtype } from './Room';
import Modal from '../../common/Modal';
export interface RoomHeaderprops extends RoomListProps {
  setRoomList: Dispatch<React.SetStateAction<Roomtype[]>>;
}

const RoomHeader = ({ roomList, setRoomList }: RoomHeaderprops) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const openModal = () => {
    setIsModal(!isModal);
  };
  return (
    <Container>
      <div>방목록</div>
      <button onClick={openModal}>방만들기</button>
      {isModal && (
        <Modal
          setIsModal={setIsModal}
          roomList={roomList}
          setRoomList={setRoomList}
        />
      )}
    </Container>
  );
};
const Container = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  div {
    color: #e8f0fe;
    font-size: 20px;
    font-weight: bold;
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
`;
export default RoomHeader;
