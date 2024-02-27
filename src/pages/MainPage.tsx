import {
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { fireStore } from '../config/firebaseConfig';
import { useParams } from 'react-router-dom';

const MainPage = () => {
  const { roomId } = useParams();
  const uid = localStorage.getItem('uid');
  useEffect(() => {
    try {
      if (roomId) {
        const getData = async () => {
          const data: DocumentData = await getDoc(
            doc(fireStore, 'rooms', roomId)
          );
          let users = data.data().users;
          users.push(uid);
          await updateDoc(doc(fireStore, 'rooms', roomId), { users: users });
        };
        getData();
        const unsubscribe = onSnapshot(
          doc(fireStore, 'rooms', roomId),
          (snapshot) => {}
        );
        return () => {
          const getData = async () => {
            const data: DocumentData = await getDoc(
              doc(fireStore, 'rooms', roomId)
            );
            let users = data.data().users;
            users = users.filter((user: string) => user !== uid);
            if (users.length === 0) {
              await deleteDoc(doc(fireStore, 'rooms', roomId));
            } else {
              await updateDoc(doc(fireStore, 'rooms', roomId), {
                users: users,
              });
            }
          };
          getData();
          unsubscribe();
        };
      } else throw new Error();
    } catch (e) {
      console.error(e);
    }
  }, []);
  return <>메인페이지</>;
};
export default MainPage;
