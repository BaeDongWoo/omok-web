import styled from 'styled-components';
import './Background.scss';
const BackGround = () => {
  return (
    <Container>
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />
    </Container>
  );
};
const Container = styled.div`
  background-color: #222831;
  transition: 0.2s;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
`;
export default BackGround;
