import {
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { fireStore } from '../config/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Board from '../components/main/board/Board';
export interface roomCheck {
  userCnt: number;
  stoneNum: number;
}
const MainPage = () => {
  const nav = useNavigate();
  const [roomUsersCnt, setRoomUserCnt] = useState<roomCheck>({
    userCnt: 0,
    stoneNum: 0,
  });
  const { roomId } = useParams();
  const uid = localStorage.getItem('uid');
  useEffect(() => {
    try {
      if (roomId) {
        let unsubscribe: any;
        const getData = async () => {
          const data: DocumentData = await getDoc(
            doc(fireStore, 'rooms', roomId)
          );
          let users = data.data().users;
          users.push(uid);
          users = Array.from(new Set(users));
          await updateDoc(doc(fireStore, 'rooms', roomId), { users: users });
        };
        const startSnapshot = () => {
          unsubscribe = onSnapshot(
            doc(fireStore, 'rooms', roomId),
            (snapshot) => {
              const data = snapshot?.data();
              if (data) {
                const stoneNum = data.users.findIndex(
                  (id: string) => id === uid
                );
                setRoomUserCnt({
                  userCnt: data.users.length,
                  stoneNum: stoneNum,
                });
              }
            }
          );
        };
        const snapshot = async () => {
          //비동기로 데이터를 처리하기 위함
          await getData();
          startSnapshot();
        };
        snapshot();
        return () => {
          const removeData = async () => {
            const data: DocumentData = await getDoc(
              doc(fireStore, 'rooms', roomId)
            );
            let users = data.data().users;
            users = users.filter((user: string) => user !== uid);
            if (users.length === 0) {
              await deleteDoc(doc(fireStore, 'rooms', roomId));
              // 뒤로가기시 랜더링 될때 해당 방이 나왔다가 사라짐
              // 후에 redux를 통해 roomList를 업데이트처리 예정
            } else {
              await updateDoc(doc(fireStore, 'rooms', roomId), {
                users: users,
              });
            }
          };
          removeData();
          unsubscribe();
        };
      } else throw new Error();
    } catch (e) {
      console.error(e);
    }
  }, []);
  return (
    <>
      <button onClick={() => nav('/waiting')}>벋흔</button>
      <Board userProps={roomUsersCnt} />
    </>
  );
};
export default MainPage;
