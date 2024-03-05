import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
export interface Roomtype {
  title: string;
  checked: boolean;
  pwd: string;
  roomId: number;
  users: number;
}
interface RoomProps {
  room: Roomtype;
}
const Room = ({ room }: RoomProps) => {
  const nav = useNavigate();
  const enterRoomHandler = () => {
    if (room.users < 2) {
      nav(`/room/${room.roomId}/${room.title}`);
    } else {
      alert('방에 입장할 수 없습니다.');
    }
  };
  return (
    <Container
      onClick={room.users < 2 ? enterRoomHandler : undefined}
      disabled={room.users >= 2 ? true : false}
    >
      <div className="room-title">
        <h2>{room.title}</h2>
      </div>
      <div className="room-state">
        <h3>{room.users < 2 ? '대기중...' : '게임중...'}</h3>
        <h2>{room.users}/2</h2>
      </div>
    </Container>
  );
};
const Container = styled.div<{ disabled: boolean }>`
  width: 90%;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
  cursor: pointer;
  height: 40px;
  background-color: ${({ disabled }) => (disabled ? '#c0c0c0' : '#00aaaa')};
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 0px 0px;
  padding: 20px;
  &:active {
    ${({ disabled }) =>
      !disabled &&
      css`
        box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
        position: relative;
        top: 2px;
      `}
  }
  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#c0c0c0' : '#019696')};
  }
  h2,
  h3 {
    color: #e8f0fe;
    margin: 0;
  }
  .room-state {
    display: flex;
    align-items: center;
    h3 {
      margin-top: 7px;
      margin-right: 10px;
    }
  }
`;
export default Room;
