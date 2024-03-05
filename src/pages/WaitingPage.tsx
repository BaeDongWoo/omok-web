import styled from 'styled-components';
import Greeting from '../components/waiting/Greeting';
import RoomHeader from '../components/waiting/room/RoomHeader';
import RoomList from '../components/waiting/room/RoomList';
import { useEffect, useState } from 'react';
import { Roomtype } from '../components/waiting/room/Room';
import { fireStore } from '../config/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import Spinner from '../components/common/Spinner';

const WaitingPage = () => {
  const [roomList, setRoomList] = useState<Roomtype[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(fireStore, 'rooms'),
        (snapshot) => {
          const updatedRooms: Roomtype[] = [];
          snapshot.forEach((room) => {
            if (room.data().users.length !== 0) {
              const roomInfo = {
                title: room.data().roomTitle,
                roomId: room.data().roomId,
                checked: room.data().checked,
                pwd: room.data().pwd,
                users: room.data().users.length,
              };
              updatedRooms.push(roomInfo);
            }
          });
          setRoomList(updatedRooms);
          setLoading(false);
        }
      );
      return () => {
        unsubscribe();
      };
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, []);
  return (
    <Container>
      <Greeting />
      <RoomHeader roomList={roomList} setRoomList={setRoomList} />
      <b className="hr"></b>
      {loading ? <Spinner></Spinner> : <RoomList roomList={roomList} />}
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
