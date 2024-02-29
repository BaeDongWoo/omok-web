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

const MainPage = () => {
  const nav = useNavigate();
  const uid = localStorage.getItem('uid');
  const nickname = localStorage.getItem('nickname');
  const { roomId, roomTitle } = useParams();
  const [me, setMe] = useState(nickname);
  const [user, setUser] = useState('user');

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
              game: { startGame: true, turn: 0 },
            });
          }
        };
        const startSnapshot = async () => {
          unsubscribe = onSnapshot(
            doc(fireStore, 'rooms', roomId),
            (snapshot) => {
              const data = snapshot?.data();
              if (data) {
                const getNick = data.nickname.filter(
                  (nick: string) => nick !== nickname
                );
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
  return (
    <>
      <TitleBox>{roomTitle}</TitleBox>
      <GameBox>
        <div>{user}</div>
        <Board />
        <div>{me}</div>
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
