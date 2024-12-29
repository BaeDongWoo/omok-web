import styled from 'styled-components';
const UserProfile = ({ onClickReady, nickname, state, start }: any) => {
  const nick = sessionStorage.getItem('nickname');
  return (
    <Container>
      <div className="nickname">{nickname}</div>
      <ReadyBtn
        onClick={onClickReady}
        state={state.toString()}
        disabled={nick !== nickname || start ? true : false}
      >
        {state ? 'GO' : 'READY'}
      </ReadyBtn>
    </Container>
  );
};
const Container = styled.div`
  width: 500px;
  height: 50%;
  //   border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ReadyBtn = styled.button<{ state: string }>`
  width: 100px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  color: #fff;
  background-color: ${({ state }) =>
    state === 'true' ? '#00aaaa' : '#696969'};
  height: 50px;
  border-radius: 10px;
  &:hover {
    background-color: ${({ state }) =>
      state === 'true' ? '#019696' : '#8b8b8b'};
  }
`;
export default UserProfile;
