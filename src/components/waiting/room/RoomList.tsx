import styled from 'styled-components';
import Room, { Roomtype } from './Room';
export interface RoomListProps {
  roomList: Roomtype[];
}
const RoomList = ({ roomList }: RoomListProps) => {
  return (
    <Container>
      {roomList.map((room, idx) => (
        <Room room={room} key={idx} />
      ))}
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  a {
  }
`;
export default RoomList;
