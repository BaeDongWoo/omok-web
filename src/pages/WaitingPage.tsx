import styled from 'styled-components';
import Greeting from '../components/waiting/Greeting';
import RoomHeader from '../components/waiting/room/RoomHeader';
import RoomList from '../components/waiting/room/RoomList';
import { useEffect, useState } from 'react';
import { Roomtype } from '../components/waiting/room/Room';
import { fireStore } from '../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const WaitingPage = () => {
  const [roomList, setRoomList] = useState<Roomtype[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(fireStore, 'rooms'),
      (snapshot) => {
        const updatedRooms: Roomtype[] = [];
        snapshot.forEach((room) => {
          const roomInfo = {
            title: room.data().roomTitle,
            roomId: room.data().roomId,
            checked: room.data().checked,
            pwd: room.data().pwd,
            users: room.data().users.length,
          };
          updatedRooms.push(roomInfo);
        });
        setRoomList(updatedRooms);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
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
