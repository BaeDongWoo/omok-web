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
  const uid = localStorage.getItem('uid');
  const nickname = localStorage.getItem('nickname');
  const nav = useNavigate();
  const { roomId, roomTitle } = useParams();
  const [me, setMe] = useState(nickname);
  const [myState, setMyState] = useState<boolean>(false);
  const [user, setUser] = useState('user');
  const [userState, setUserState] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(false);
  const [count, setCount] = useState<number>(5);
  const [isCount, setIsCount] = useState<boolean>(false);
  const [turn, setTurn] = useState<string>('');
  useEffect(() => {
    if (count > 0) {
      const intervalId = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [count]);
  useEffect(() => {
    if (isCount) {
      const startTimeout = setTimeout(() => {
        setStart(true);
      }, 5000);
      return () => clearTimeout(startTimeout);
    } else setStart(false);
  }, [isCount]);
  const countDown = (time: number) => {
    setCount(time);
  };
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
          nick = Array.from(new Set(nick));
          await updateDoc(doc(fireStore, 'rooms', roomId), {
            users: users,
            nickname: nick,
          });
          if (users.length === 2) {
            if (data.data().game.startGame === false) {
              await updateDoc(doc(fireStore, 'rooms', roomId), {
                game: { startGame: false, turn: 0 },
              });
            }
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
                setMyState(data.ready[index]);
                setUserState(data.ready[userIndex]);
                setTurn(data.nickname[data.game.turn]);
                const getNick = data.nickname.filter(
                  (nick: string) => nick !== nickname
                );
                if (data.ready[0] === true && data.ready[1] === true) {
                  if (data.game.startGame === false) {
                    setIsCount(true);
                    countDown(5);
                  } else {
                    setStart(true);
                  }
                } else {
                  setIsCount(false);
                  countDown(0);
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
            } else if (users.length === 1) {
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
    <Container>
      <TitleBox>{roomTitle}</TitleBox>
      {start ? (
        <TitleBox>{turn}님 차례입니다</TitleBox>
      ) : (
        <TitleBox>
          {isCount ? `${count}초뒤 게임이 시작됩니다!` : '준비를 완료해 주세요'}
        </TitleBox>
      )}
      <GameBox>
        <UserProfile
          onClickReady={onClickReady}
          nickname={user}
          state={userState}
          start={start}
        />
        <BoardBox>
          <Board start={start} />
          <ExitBtn onClick={() => nav('/waiting')}>나가기</ExitBtn>
        </BoardBox>
        <UserProfile
          onClickReady={onClickReady}
          nickname={me}
          state={myState}
          start={start}
        />
      </GameBox>
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const TitleBox = styled.h1`
  color: #e8f0fe;
  text-align: center;
  margin-top: 50px;
  // margin-bottom: 50px;
`;
const BoardBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const GameBox = styled.div`
  display: flex;
  color: #e8f0fe;
`;
const ExitBtn = styled.button`
  width: 100px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  background-color: #00aaaa;
  height: 50px;
  border-radius: 10px;
  &:hover {
    background-color: #019696;
  }
`;
export default MainPage;
