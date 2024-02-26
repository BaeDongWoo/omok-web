import styled from 'styled-components';

const Greeting = () => {
  const nickname = sessionStorage.getItem('nickname');
  return (
    <Container>
      <h1>환영합니다 {nickname}님!!</h1>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  h1 {
    color: #e8f0fe;
    text-align: center;
  }
`;
export default Greeting;
