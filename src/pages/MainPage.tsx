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
import styled from 'styled-components';
import UserProfile from '../components/main/userprofile/UserProfile';

const MainPage = () => {
  const nav = useNavigate();
  const uid = localStorage.getItem('uid');
  const nickname = localStorage.getItem('nickname');
  const { roomId, roomTitle } = useParams();
  const [me, setMe] = useState(nickname);
  const [meState, setMeState] = useState<boolean>(false);
  const [user, setUser] = useState('user');
  const [userState, setUserState] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [onReady, setOnReady] = useState<boolean>(false);
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
          let nick = data.data().nickname;
          nick.push(nickname);
          await updateDoc(doc(fireStore, 'rooms', roomId), {
            users: users,
            nickname: nick,
          });
          if (users.length === 2) {
            await updateDoc(doc(fireStore, 'rooms', roomId), {
              game: { startGame: false, turn: 0 },
            });
            setOnReady(true);
          }
        };
        const startSnapshot = async () => {
          unsubscribe = onSnapshot(
            doc(fireStore, 'rooms', roomId),
            (snapshot) => {
              const data = snapshot?.data();
              if (data) {
                const index = data.users.findIndex(
                  (user: string) => user === uid
                );
                let userIndex;
                if (index === 1) userIndex = 0;
                else userIndex = 1;
                setMeState(data.ready[index]);

                setUserState(data.ready[userIndex]);
                const getNick = data.nickname.filter(
                  (nick: string) => nick !== nickname
                );
                if (data.ready[0] === true && data.ready[1] === true) {
                  setStart(true);
                } else {
                  setStart(false);
                }
                if (getNick.length === 0) {
                  setUser('user');
                } else {
                  setUser(getNick[0]);
                }
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
            let nick = data.data().nickname;
            nick = nick.filter((ni: string) => ni !== nickname);
            if (users.length === 0) {
              await deleteDoc(doc(fireStore, 'rooms', roomId));
              // 뒤로가기시 랜더링 될때 해당 방이 나왔다가 사라짐
              // 후에 redux를 통해 roomList를 업데이트처리 예정
            } else {
              await updateDoc(doc(fireStore, 'rooms', roomId), {
                users: users,
                nickname: nick,
                game: { startGame: false, turn: 0 },
                ready: [false, false],
                board: [],
              });
            }
            unsubscribe();
          };
          removeData();
        };
      } else throw new Error();
    } catch (e) {
      console.error(e);
    }
  }, []);
  const onClickReady = async () => {
    if (roomId) {
      const data = await getDoc(doc(fireStore, 'rooms', roomId));
      const roomData = data.data();
      if (roomData) {
        const index = roomData.users.findIndex((user: string) => user === uid);
        let ready = roomData.ready;
        if (ready[index] === false) {
          ready[index] = true;
          await updateDoc(doc(fireStore, 'rooms', roomId), {
            ready: ready,
          });
        } else {
          ready[index] = false;
          await updateDoc(doc(fireStore, 'rooms', roomId), {
            ready: ready,
          });
        }
      }
    }
  };
  return (
    <>
      <TitleBox>{roomTitle}</TitleBox>
      <GameBox>
        <UserProfile
          onClickReady={onClickReady}
          nickname={user}
          state={userState}
        />
        <Board start={start} />
        <UserProfile
          onClickReady={onClickReady}
          nickname={me}
          state={meState}
        />
      </GameBox>
    </>
  );
};
const TitleBox = styled.h1`
  color: #e8f0fe;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
`;
const GameBox = styled.div`
  display: flex;
  color: #e8f0fe;
`;
export default MainPage;
