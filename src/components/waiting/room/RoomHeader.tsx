import { Dispatch, useRef } from 'react';
import styled from 'styled-components';
import { RoomListProps } from './RoomList';
import { Roomtype } from './Room';
interface RoomHeaderprops extends RoomListProps {
  setRoomList: Dispatch<React.SetStateAction<Roomtype[]>>;
}
const RoomHeader = ({ roomList, setRoomList }: RoomHeaderprops) => {
  const addRoomList = () => {
    const roomInfo = {
      title: '타이틀' + roomList.length,
      roomId: roomList.length + 1,
    };
    roomList.push(roomInfo);
    setRoomList([...roomList]);
  };
  return (
    <Container>
      <div>방목록</div>
      <button onClick={addRoomList}>방만들기</button>
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
