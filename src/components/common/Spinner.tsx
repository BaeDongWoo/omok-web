import styled, { keyframes } from 'styled-components';

const Spinner = () => {
  return <Container></Container>;
};
const spin = keyframes`
100% {
  transform: rotate(360deg);
}
`;
const Container = styled.div`
  margin: calc(50% - 25px) auto;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 100%;
  animation: ${spin} 1s ease-in-out infinite;
`;
export default Spinner;
