import styled from 'styled-components';
import Greeting from '../components/waiting/Greeting';
import RoomHeader from '../components/waiting/room/RoomHeader';
import RoomList from '../components/waiting/room/RoomList';
import { useEffect, useState } from 'react';
import { Roomtype } from '../components/waiting/room/Room';

const WaitingPage = () => {
  const [roomList, setRoomList] = useState<Roomtype[]>((): any => {
    const list = sessionStorage.getItem('roomList') || '';
    return list ? JSON.parse(list) : [];
  });

  useEffect(() => {
    sessionStorage.setItem('roomList', JSON.stringify(roomList));
    console.log('asdas');
  }, [roomList]);
  return (
    <Container>
      <Greeting />
      <RoomHeader roomList={roomList} setRoomList={setRoomList} />
      <b className="hr"></b>
      <RoomList roomList={roomList} />
    </Container>
  );
};
const Container = styled.div`
  width: 60%;
  max-width: 1000px;
  margin: auto;
  padding: 100px;
`;
export default WaitingPage;
