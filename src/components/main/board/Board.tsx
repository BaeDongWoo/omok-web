// const Board = () => {
//   return <></>;
// };
// export default Board;
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Cell {
  x: number;
  y: number;
}

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardSize = 18;
  const cellSize = 20;
  const cavasSize = boardSize * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      drawBoard(ctx);
    }
  }, []);

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#00aaaa';
    ctx.lineWidth = 1;
    for (let i = 1; i <= boardSize; i++) {
      ctx.beginPath(); // 새로운 선을 그리기 시작
      const startCell = i * cellSize;
      ctx.moveTo(0, startCell); // x,y x가 가로위치
      ctx.lineTo(cavasSize, startCell);
      ctx.moveTo(startCell, 0);
      ctx.lineTo(startCell, cavasSize);
      ctx.stroke();
    }
    ctx.closePath();
  };
  return (
    <Container>
      <BoardGrid
        ref={canvasRef}
        width={cavasSize}
        height={cavasSize}
        style={{ border: '3px solid #00aaaa' }}
      />
    </Container>
  );
};
const Container = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  line-height: 100px;
`;
const BoardGrid = styled.canvas``;
export default Board;
