import styled from 'styled-components';

const RoomHeader = () => {
  return (
    <Container>
      <div>방목록</div>
      <button>방만들기</button>
    </Container>
  );
};
const Container = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  div {
    color: #e8f0fe;
    font-size: 20px;
    font-weight: bold;
  }
  button {
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    background-color: #00aaaa;
  }
`;
export default RoomHeader;
