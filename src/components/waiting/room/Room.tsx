import { Link } from 'react-router-dom';
import styled from 'styled-components';
export interface Roomtype {
  title: string;
  checked: boolean;
  pwd: string;
  roomId: number;
}
interface RoomProps {
  room: Roomtype;
}
const Room = ({ room }: RoomProps) => {
  return (
    <Container to={`/room/${room.roomId}`}>
      <h2>{room.title}</h2>
    </Container>
  );
};
const Container = styled(Link)`
  width: 90%;
  text-decoration: none;
  cursor: pointer;
  height: 40px;
  background-color: #00aaaa;
  margin-bottom: 10px;
  box-shadow: rgba(0, 0, 0, 0.5) 5px 5px 0px 0px;
  padding: 20px;
  &:active {
    box-shadow: 1px 1px 0 rgb(0, 0, 0, 0.5);
    position: relative;
    top: 2px;
  }
  &:hover {
    background-color: #019696;
  }
  h2 {
    color: #e8f0fe;
    margin: 0;
  }
`;
export default Room;
