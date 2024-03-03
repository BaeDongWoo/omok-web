import styled from 'styled-components';
const UserProfile = ({ onClickReady, nickname, state }: any) => {
  const nick = localStorage.getItem('nickname');

  return (
    <Container>
      <div className="nickname">{nickname}</div>
      <Ready state={state}>{state ? 'GO' : 'READY'}</Ready>
      <ReadyBtn
        onClick={onClickReady}
        state={state}
        disabled={nick === nickname ? false : true}
      >
        {state ? 'GO' : 'READY'}
      </ReadyBtn>
    </Container>
  );
};
const Container = styled.div`
  width: 500px;
  height: 50%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Ready = styled.div<{ state: boolean }>`
  color: ${({ state }) => (state ? 'black' : 'white')};
`;
const ReadyBtn = styled.button<{ state: boolean }>`
  width: 100px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  background-color: ${({ state }) => (state ? '#00aaaa' : '#696969')};
  height: 50px;
  border-radius: 10px;
  &:hover {
    background-color: ${({ state }) => (state ? '#019696' : '#8b8b8b')};
  }
`;
export default UserProfile;
