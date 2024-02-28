import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Cell {
  x: number;
  y: number;
}

const Board = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stones, setStones] = useState<Cell[]>([]);
  const boardSize = 19;
  const cellSize = 30;
  const cavasSize = boardSize * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      drawBoard(ctx);
    }
  }, [stones]);

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#00aaaa';
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, cavasSize, cavasSize);
    for (let i = 1; i <= boardSize; i++) {
      ctx.beginPath(); // 새로운 선을 그리기 시작
      const startCell = i * cellSize;
      ctx.moveTo(0, startCell); // x,y x가 가로위치
      ctx.lineTo(cavasSize, startCell);
      ctx.moveTo(startCell, 0);
      ctx.lineTo(startCell, cavasSize);
      ctx.stroke();
    }
    drawStone(ctx);
    ctx.closePath();
  };
  const drawStone = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#00aaaa';
    ctx.fillStyle = '#000';
    ctx.globalAlpha = 1;
    for (let i = 0; i < stones.length; i++) {
      const X = stones[i].x;
      const Y = stones[i].y;
      ctx.beginPath();
      ctx.arc(X, Y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  };
  const onMouseMoveStone = (e: any) => {
    const canvas = canvasRef.current;
    let index = canvas?.getBoundingClientRect();
    if (index) {
      const { x, y } = {
        x: Math.round((e.clientX - index.left) / 30) * 30,
        y: Math.round((e.clientY - index.top) / 30) * 30,
      };
      markStone({ x, y });
      return { x, y };
    }
  };
  const markStone = ({ x, y }: Cell) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      drawBoard(ctx);
      ctx.beginPath();
      ctx.strokeStyle = '#00aaaa';
      ctx.fillStyle = '#000';
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  };
  const onClickStone = (e: any) => {
    const canvas = canvasRef.current;
    let index = canvas?.getBoundingClientRect();
    if (index) {
      const { x, y } = {
        x: Math.round((e.clientX - index.left) / 30) * 30,
        y: Math.round((e.clientY - index.top) / 30) * 30,
      };
      setStones([...stones, { x, y }]);
    }
  };
  return (
    <Container>
      <BoardGrid
        ref={canvasRef}
        width={cavasSize}
        height={cavasSize}
        style={{ border: '3px solid #00aaaa' }}
        onMouseMove={onMouseMoveStone}
        onClick={onClickStone}
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
