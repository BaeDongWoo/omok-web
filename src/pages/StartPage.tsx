import styled from 'styled-components';
import NicknameInput from '../components/start/NicknameInput';
import { useEffect } from 'react';
import { auth } from '../config/firebaseConfig';

const StartPage = () => {
  useEffect(() => {
    // auth.signOut();
  }, []);
  return (
    <Container>
      <NicknameInput />
    </Container>
  );
};
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default StartPage;
